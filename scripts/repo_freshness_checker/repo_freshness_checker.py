#!/usr/bin/env python3
"""
GitHub Repo Freshness Checker v2.2
===================================
Reads a file containing GitHub URLs, checks last-update dates via the
GitHub API, and writes a sorted Markdown report.  Uses parallel API
requests (ThreadPoolExecutor) for drastically faster checking.

  GUI mode : python repo_freshness_checker.py
  CLI mode : python repo_freshness_checker.py README.md -o report.md -t ghp_xxxx

"""

import os, re, sys, time, json, threading, argparse
from datetime import datetime, timezone
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

try:
    import requests as _requests
except ImportError:
    print("ERROR: 'requests' is required.\n  pip install requests")
    sys.exit(1)

# ──────────────────────────── config ────────────────────────────
VERSION           = "2.2.0"
CONFIG_DIR        = Path.home() / ".repo-freshness-checker"
TOKEN_FILE        = CONFIG_DIR / "token"
API_BASE          = "https://api.github.com"
DEFAULT_WORKERS   = 15       # concurrent API requests
REQUEST_TIMEOUT   = 15       # seconds per request
MAX_RETRIES       = 2        # max retries on rate-limit

# ──────────────────────── token helpers ─────────────────────────
def save_token(token: str):
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    # Set umask so file is created with 0o600 from the start (prevents TOCTOU)
    old_umask = os.umask(0o177)
    try:
        TOKEN_FILE.write_text(token.strip(), encoding="utf-8")
    finally:
        os.umask(old_umask)
    # Also chmod for safety (handles existing files with wrong perms)
    if os.name != "nt":
        os.chmod(TOKEN_FILE, 0o600)

def load_token() -> str:
    if TOKEN_FILE.exists():
        t = TOKEN_FILE.read_text(encoding="utf-8").strip()
        if t:
            return t
    return os.environ.get("GITHUB_TOKEN", "")

def clear_saved_token():
    if TOKEN_FILE.exists():
        TOKEN_FILE.unlink()


def validate_token(token: str) -> tuple[bool, str]:
    """Basic validation of GitHub token format. Returns (is_valid, message)."""
    if not token:
        return False, "Token is empty"
    t = token.strip()
    # Classic PATs: ghp_, gho_, ghu_, ghs_, ghr_
    # Fine-grained PATs: github_pat_
    if re.match(r'^(gh[opusr]_|github_pat_)', t):
        if len(t) < 20:
            return False, "Token seems too short (likely invalid)"
        return True, ""
    # Could be a token passed via env var in a different format
    if len(t) >= 40:
        return True, ""
    return False, "Doesn't look like a GitHub token (should start with ghp_ or github_pat_)"

# ──────────────────── URL extraction ────────────────────────────
_GH_URL_RE = re.compile(
    r"https?://github\.com/"
    r"([a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?)"  # owner
    r"/"
    r"([a-zA-Z0-9._-]+)",                              # repo
    re.IGNORECASE,
)
_SKIP_SEGMENTS = frozenset(
    "issues pulls pull wiki wikis releases actions settings blob tree "
    "commit commits compare archive stargazers network graphs discussions "
    "packages projects security insights tags milestone milestones labels "
    "new edit delete raw suites check-runs deployments".split()
)

def extract_repos(filepath: str) -> list[tuple[str, str]]:
    """Return de-duplicated [(owner, repo), …] from *filepath*."""
    text = Path(filepath).read_text(encoding="utf-8", errors="ignore")
    seen: set[str] = set()
    out: list[tuple[str, str]] = []
    for m in _GH_URL_RE.finditer(text):
        owner, repo = m.group(1), m.group(2)
        repo = re.sub(r"\.git$", "", repo.rstrip("/"))
        if repo.lower() in _SKIP_SEGMENTS:
            continue
        key = f"{owner}/{repo}".lower()
        if key not in seen:
            seen.add(key)
            out.append((owner, repo))
    return out

# ──────────────────── GitHub API layer ──────────────────────────
def _session(token: str) -> _requests.Session:
    s = _requests.Session()
    s.headers.update({
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": f"RepoFreshnessChecker/{VERSION}",
    })
    if token:
        s.headers["Authorization"] = f"token {token}"
    return s

def verify_auth(session: _requests.Session) -> dict | None:
    r = session.get(f"{API_BASE}/rate_limit", timeout=15)
    if r.status_code != 200:
        return None
    c = r.json()["resources"]["core"]
    return {
        "authed": "Authorization" in session.headers,
        "limit": c["limit"],
        "remaining": c["remaining"],
        "reset_ts": c["reset"],
    }

def fetch_repo(session: _requests.Session, owner: str, repo: str) -> dict:
    """Fetch a single repo's info. Returns a dict with consistent keys."""
    try:
        r = session.get(
            f"{API_BASE}/repos/{owner}/{repo}",
            timeout=REQUEST_TIMEOUT,
        )
        if r.status_code == 200:
            d = r.json()
            pa = d.get("pushed_at")
            return {
                "ok": True,
                "pushed_at": datetime.strptime(pa, "%Y-%m-%dT%H:%M:%SZ").replace(
                    tzinfo=timezone.utc
                ) if pa else None,
                "archived": d.get("archived", False),
                "stars": d.get("stargazers_count", 0),
                "description": d.get("description") or "",
            }
        if r.status_code == 404:
            return {"ok": False, "error": "Not found (deleted / private)"}
        if r.status_code == 451:
            return {"ok": False, "error": "Unavailable (DMCA / legal)"}
        if r.status_code == 403:
            rem = r.headers.get("X-RateLimit-Remaining", "?")
            if rem == "0":
                reset = int(r.headers.get("X-RateLimit-Reset", 0))
                return {"ok": False, "error": "Rate-limited",
                        "rate_limited": True, "reset_ts": reset}
            return {"ok": False, "error": "Forbidden (403)"}
        if r.status_code == 429:
            reset = int(r.headers.get("X-RateLimit-Reset", time.time() + 60))
            return {"ok": False, "error": "Rate-limited (429)",
                    "rate_limited": True, "reset_ts": reset}
        return {"ok": False, "error": f"HTTP {r.status_code}"}
    except _requests.exceptions.Timeout:
        return {"ok": False, "error": "Timeout"}
    except _requests.exceptions.ConnectionError:
        return {"ok": False, "error": "Connection error"}
    except _requests.exceptions.RequestException as e:
        return {"ok": False, "error": f"Request failed: {e}"}

# ──────────────────── processing loop ───────────────────────────
def process_repos(
    repos: list[tuple[str, str]],
    token: str,
    progress_cb=None,   # (current, total) -> None
    log_cb=None,         # (msg: str) -> None
    cancel: threading.Event | None = None,
    max_workers: int = DEFAULT_WORKERS,
) -> tuple[list[dict], list[dict]]:
    """
    Check all repos using a thread pool for parallel API requests.
    Returns (results, errors).
    """
    session = _session(token)
    auth = verify_auth(session)
    if auth and log_cb:
        tag = "Authenticated" if auth["authed"] else "Unauthenticated"
        log_cb(f"🔑 {tag} — rate limit {auth['remaining']}/{auth['limit']}")

    results: list[dict] = []
    errors: list[dict] = []
    total = len(repos)
    if total == 0:
        return results, errors

    results_lock = threading.Lock()
    processed = 0
    processed_lock = threading.Lock()
    start_time = time.time()

    # Track remaining rate limit across threads
    rl_remaining = auth["remaining"] if auth else None
    rl_reset_ts = auth["reset_ts"] if auth else 0
    rl_lock = threading.Lock()

    def _check_one(owner: str, repo: str) -> dict | None:
        """Check one repo, retrying on rate-limit. Returns None if cancelled."""
        nonlocal rl_remaining, rl_reset_ts

        if cancel and cancel.is_set():
            return None

        # Pre-check rate limit (approximate, shared across threads)
        with rl_lock:
            if rl_remaining is not None and rl_remaining < 5:
                wait = max(0, rl_reset_ts - time.time()) + 5
                if wait > 0:
                    if log_cb:
                        log_cb(f"⏳ Rate-limit low — waiting {wait:.0f}s …")
                    _interruptible_sleep(wait, cancel)
                    if cancel and cancel.is_set():
                        return None
                    # Re-check auth after wait
                    new_auth = verify_auth(session)
                    if new_auth:
                        rl_remaining = new_auth["remaining"]
                        rl_reset_ts = new_auth["reset_ts"]

        for attempt in range(MAX_RETRIES):
            if cancel and cancel.is_set():
                return None

            info = fetch_repo(session, owner, repo)

            # Decrement remaining counter
            with rl_lock:
                if rl_remaining is not None:
                    rl_remaining -= 1

            # Handle rate-limit with retry
            if info.get("rate_limited"):
                wait = max(0, info.get("reset_ts", time.time() + 60)) - time.time() + 5
                if log_cb:
                    log_cb(f"⏳ Rate-limited — waiting {wait:.0f}s …")
                _interruptible_sleep(wait, cancel)
                if cancel and cancel.is_set():
                    return None
                # Re-check auth after wait
                new_auth = verify_auth(session)
                if new_auth:
                    rl_remaining = new_auth["remaining"]
                    rl_reset_ts = new_auth["reset_ts"]
                continue

            return (owner, repo, info)

        # All retries exhausted
        return (owner, repo, {"ok": False, "error": "Rate-limited (retries exhausted)"})

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_map = {
            executor.submit(_check_one, owner, repo): (owner, repo)
            for owner, repo in repos
        }

        for future in as_completed(future_map):
            if cancel and cancel.is_set():
                # Cancel remaining futures
                for f in future_map:
                    f.cancel()
                if log_cb:
                    log_cb("⛔ Cancelled.")
                break

            result = future.result()
            if result is None:
                continue

            owner, repo, info = result

            with processed_lock:
                processed += 1
                cur = processed

            # ETA calculation
            elapsed = time.time() - start_time
            rate = cur / elapsed if elapsed > 0 else 0
            eta_secs = (total - cur) / rate if rate > 0 else 0

            dyn_info = {"cur": cur, "total": total, "eta": eta_secs, "rate": rate}

            if progress_cb:
                progress_cb(cur, total, dyn_info)

            if info["ok"]:
                ds = info["pushed_at"].strftime("%Y-%m-%d") if info["pushed_at"] else "N/A"
                arc = " [ARCHIVED]" if info["archived"] else ""
                with results_lock:
                    results.append({
                        "name": f"{owner}/{repo}",
                        "date": info["pushed_at"],
                        "url": f"https://github.com/{owner}/{repo}",
                        "archived": info["archived"],
                        "stars": info["stars"],
                    })
                if log_cb:
                    log_cb(f"[{cur}/{total}] ✅ {owner}/{repo}  —  {ds}{arc}")
            else:
                with results_lock:
                    errors.append({
                        "name": f"{owner}/{repo}",
                        "url": f"https://github.com/{owner}/{repo}",
                        "error": info["error"],
                    })
                if log_cb:
                    log_cb(f"[{cur}/{total}] ❌ {owner}/{repo}  —  {info['error']}")

    return results, errors


def _interruptible_sleep(seconds, cancel):
    end = time.time() + seconds
    while time.time() < end:
        if cancel and cancel.is_set():
            return
        time.sleep(0.5)

# ──────────────────── report generation ─────────────────────────
def _age_str(days: int) -> str:
    y, rem = divmod(days, 365)
    m = rem // 30
    if y:
        return f"{y}y {m}m"
    if m:
        return f"{m}m"
    return f"{days}d"

def _status(days: int, archived: bool) -> str:
    if archived:
        return "📦 Archived"
    if days > 5 * 365:
        return "🔴 5 + yrs"
    if days > 3 * 365:
        return "🟠 3-5 yrs"
    if days > 365:
        return "🟡 1-3 yrs"
    return "🟢 Active"

def _health_score(results: list[dict]) -> str:
    """Return an overall health emoji based on results distribution."""
    if not results:
        return "❓"
    active = sum(1 for r in results if r.get("date") and not r["archived"]
                 and (datetime.now(timezone.utc) - r["date"]).days <= 365)
    ratio = active / len(results)
    if ratio >= 0.9:
        return "🟢 Excellent"
    if ratio >= 0.7:
        return "🟡 Fair"
    if ratio >= 0.4:
        return "🟠 Poor"
    return "🔴 Critical"


def generate_report(results: list[dict], errors: list[dict], path: str):
    """Generate a polished Markdown report sorted oldest → newest."""
    now = datetime.now(timezone.utc)
    results.sort(
        key=lambda r: r["date"] or datetime.min.replace(tzinfo=timezone.utc)
    )

    counts: dict[str, int] = {
        "🟢 Active (< 1 yr)": 0,
        "🟡 Aging (1-3 yrs)": 0,
        "🟠 Old (3-5 yrs)": 0,
        "🔴 Stale (5 + yrs)": 0,
        "📦 Archived": 0,
    }
    for r in results:
        if r["archived"]:
            counts["📦 Archived"] += 1
        elif r["date"]:
            d = (now - r["date"]).days
            if d > 5*365:   counts["🔴 Stale (5 + yrs)"] += 1
            elif d > 3*365: counts["🟠 Old (3-5 yrs)"]   += 1
            elif d > 365:   counts["🟡 Aging (1-3 yrs)"]  += 1
            else:           counts["🟢 Active (< 1 yr)"]  += 1

    total_ok = len(results)
    total_err = len(errors)
    total = total_ok + total_err

    L: list[str] = []
    L.append(f"# 📊 Repository Freshness Report\n")
    L.append("<div align=\"center\">\n")
    L.append(f"> **Generated:** {now.strftime('%Y-%m-%d %H:%M UTC')}  ")
    L.append(f"> **Repos checked:** {total}  ")
    L.append(f"> **Health:** {_health_score(results)}  ")
    L.append("</div>\n")
    L.append("---\n")

    # Summary
    L.append("## 📋 Summary\n")
    L.append("| Category | Count | Share |")
    L.append("|----------|------:|-----:|")
    ok_total = sum(counts.values())
    for k, v in counts.items():
        share = f"{v/ok_total*100:.1f}%" if ok_total else "—"
        L.append(f"| {k} | {v} | {share} |")
    L.append(f"| **Total OK** | **{total_ok}** | |")
    if errors:
        L.append(f"| ❌ Errors | {total_err} | |")
    L.append("")

    # Overall stats row
    total_stars = sum(r.get("stars", 0) for r in results)
    avg_stars = total_stars / total_ok if total_ok else 0
    L.append("> ")
    L.append(f"> ⭐ **{total_stars:,}** total stars  ·  "
             f"📦 **{counts['📦 Archived']}** archived  ·  "
             f"⚠️ **{total_err}** errors")
    L.append("")

    L.append("---\n")

    # Detailed table
    L.append("## 📌 Repositories (oldest → newest)\n")
    L.append("| # | Repository | Last Commit | Age | ⭐ | Status |")
    L.append("|---|-----------|:-----------|:----|---:|--------|")
    for i, r in enumerate(results, 1):
        if r["date"]:
            d = (now - r["date"]).days
            ds = r["date"].strftime("%Y-%m-%d")
            age = _age_str(d)
            st  = _status(d, r["archived"])
        else:
            ds, age, st = "N/A", "—", "❓"
        L.append(f"| {i} | [{r['name']}]({r['url']}) | {ds} | {age} | "
                 f"{r['stars']} | {st} |")

    if errors:
        L.append("\n---\n")
        L.append(f"## ⚠️ Errors ({len(errors)})\n")
        L.append("| # | Repository | Error |")
        L.append("|---|-----------|-------|")
        for i, e in enumerate(errors, 1):
            L.append(f"| {i} | [{e['name']}]({e['url']}) | {e['error']} |")

    L.append("")
    L.append("---")
    L.append(f"*Report generated by [Repo Freshness Checker]({API_BASE}) v{VERSION}*")

    Path(path).write_text("\n".join(L) + "\n", encoding="utf-8")

# ──────────────────── HTML report ──────────────────────────────
def generate_html_report(results: list[dict], errors: list[dict], path: str):
    """Generate a standalone HTML report with filtering and sorting (vanilla JS)."""
    now = datetime.now(timezone.utc)
    results.sort(
        key=lambda r: r["date"] or datetime.min.replace(tzinfo=timezone.utc)
    )

    # ── helpers ─────────────────────────────────────────────
    def _status_html(days, archived):
        if archived:
            return '<span class="status archived">📦 Archived</span>'
        if days > 5*365:
            return '<span class="status stale">🔴 5+ yrs</span>'
        if days > 3*365:
            return '<span class="status old">🟠 3-5 yrs</span>'
        if days > 365:
            return '<span class="status aging">🟡 1-3 yrs</span>'
        return '<span class="status active">🟢 Active</span>'

    def _age_html(days):
        y, rem = divmod(days, 365)
        m = rem // 30
        if y:
            return f"{y}y {m}m"
        if m:
            return f"{m}m"
        return f"{days}d"

    # ── stats ───────────────────────────────────────────────
    total_ok = len(results)
    total_err = len(errors)
    total = total_ok + total_err
    total_stars = sum(r.get("stars", 0) for r in results)
    archived = sum(1 for r in results if r["archived"])
    active_yr = sum(1 for r in results if r.get("date")
                    and not r["archived"]
                    and (now - r["date"]).days <= 365)

    # Health
    ratio = active_yr / total_ok if total_ok else 0
    if ratio >= 0.9:
        health_emoji, health_label, health_class = "🟢", "Excellent", "excellent"
    elif ratio >= 0.7:
        health_emoji, health_label, health_class = "🟡", "Fair", "fair"
    elif ratio >= 0.4:
        health_emoji, health_label, health_class = "🟠", "Poor", "poor"
    else:
        health_emoji, health_label, health_class = "🔴", "Critical", "critical"

    # Counts for summary table
    cats = [
        ("Active (< 1 yr)", 0),
        ("Aging (1-3 yrs)", 0),
        ("Old (3-5 yrs)", 0),
        ("Stale (5+ yrs)", 0),
        ("Archived", 0),
    ]
    for r in results:
        if r["archived"]:
            cats[4] = (cats[4][0], cats[4][1] + 1)
        elif r["date"]:
            d = (now - r["date"]).days
            if d > 5*365:
                cats[3] = (cats[3][0], cats[3][1] + 1)
            elif d > 3*365:
                cats[2] = (cats[2][0], cats[2][1] + 1)
            elif d > 365:
                cats[1] = (cats[1][0], cats[1][1] + 1)
            else:
                cats[0] = (cats[0][0], cats[0][1] + 1)

    # ── build rows data ──────────────────────────────────────
    rows_data = []
    for i, r in enumerate(results, 1):
        if r["date"]:
            d = (now - r["date"]).days
            ds = r["date"].strftime("%Y-%m-%d")
            age = _age_html(d)
            st_html = _status_html(d, r["archived"])
            st_sort = "archived" if r["archived"] else (
                "stale" if d > 5*365 else
                "old" if d > 3*365 else
                "aging" if d > 365 else "active"
            )
        else:
            ds, age, st_html, st_sort = "N/A", "—", "❓", "unknown"
        rows_data.append({
            "num": i,
            "name": r["name"],
            "url": r["url"],
            "date": ds,
            "age": age,
            "stars": r["stars"],
            "status_html": st_html,
            "status_sort": st_sort,
        })

    # ── build error rows ─────────────────────────────────────
    err_rows = "".join(
        f"<tr><td>{i}</td><td><a href='{e['url']}' target='_blank'>{e['name']}</a></td>"
        f"<td class='err-msg'>{e['error']}</td></tr>"
        for i, e in enumerate(errors, 1)
    )

    # ── build summary rows ───────────────────────────────────
    ok_total = sum(c[1] for c in cats)
    summary_rows = "".join(
        f"<tr><td>{name}</td><td>{count}</td>"
        f"<td>{count/ok_total*100:.1f}%</td></tr>"
        if ok_total else f"<tr><td>{name}</td><td>{count}</td><td>—</td></tr>"
        for name, count in cats
    )

    # ── inline CSS ───────────────────────────────────────────
    CSS = """*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;background:#1e1e2e;color:#cdd6f4;padding:24px;line-height:1.5}
.wrap{max-width:1200px;margin:0 auto}
h1{font-size:1.6rem;color:#b4befe;margin-bottom:4px}
.sub{color:#a6adc8;font-size:.9rem;margin-bottom:16px}
.health{display:inline-block;padding:4px 14px;border-radius:20px;font-weight:700;font-size:.85rem}
.health.excellent{background:#a6e3a1;color:#1e1e2e}
.health.fair{background:#f9e2af;color:#1e1e2e}
.health.poor{background:#fab387;color:#1e1e2e}
.health.critical{background:#f38ba8;color:#1e1e2e}
.stats{display:flex;gap:16px;flex-wrap:wrap;margin:12px 0 16px;color:#a6adc8;font-size:.85rem}
.stats span{background:#313244;padding:4px 12px;border-radius:6px}
.controls{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px;align-items:center}
.controls input,.controls select{padding:7px 10px;border-radius:6px;border:1px solid #45475a;background:#313244;color:#cdd6f4;font-size:.85rem}
.controls input:focus,.controls select:focus{outline:none;border-color:#89b4fa}
.controls label{color:#a6adc8;font-size:.85rem}
table{width:100%;border-collapse:collapse;background:#181825;border-radius:8px;overflow:hidden;margin-bottom:16px}
th{background:#313244;color:#b4befe;font-weight:600;text-align:left;padding:10px 12px;cursor:pointer;user-select:none;white-space:nowrap;position:relative}
th:hover{background:#45475a}
th .arrow{color:#89b4fa;margin-left:4px;font-size:.75rem}
td{padding:8px 12px;border-bottom:1px solid #313244;font-size:.875rem}
tr:hover td{background:#2a2a3c}
a{color:#89b4fa;text-decoration:none}
a:hover{text-decoration:underline}
.status{padding:2px 8px;border-radius:4px;font-size:.8rem;white-space:nowrap}
.status.active{background:#1e3a2f;color:#a6e3a1}
.status.aging{background:#3a3520;color:#f9e2af}
.status.old{background:#3a2a1a;color:#fab387}
.status.stale{background:#3a1a24;color:#f38ba8}
.status.archived{background:#2a2a3c;color:#a6adc8}
.num{color:#6c7086;font-size:.8rem;text-align:center;width:36px}
.stars{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
.date{white-space:nowrap;font-variant-numeric:tabular-nums}
h2{color:#b4befe;font-size:1.1rem;margin:20px 0 8px}
.err-msg{color:#f38ba8}
.footer{margin-top:24px;padding-top:12px;border-top:1px solid #313244;color:#6c7086;font-size:.8rem;text-align:center}
.empty{text-align:center;padding:32px;color:#6c7086;font-size:.9rem}
"""

    # ── inline JS ────────────────────────────────────────────
    # We embed the data as JSON, then JS builds the table + sorting/filtering
    rows_json = json.dumps(rows_data)
    err_count = total_err

    JS = f"""
const data = {rows_json};
let sortCol = null, sortAsc = true;

function render() {{
    const statusFilter = document.getElementById('statusFilter').value;
    const searchVal = document.getElementById('searchBox').value.toLowerCase();
    const tbody = document.getElementById('repoBody');

    // Filter
    let filtered = data;
    if (statusFilter !== 'all') {{
        filtered = filtered.filter(r => r.status_sort === statusFilter);
    }}
    if (searchVal) {{
        filtered = filtered.filter(r =>
            r.name.toLowerCase().includes(searchVal) ||
            r.date.includes(searchVal)
        );
    }}

    // Sort
    if (sortCol !== null) {{
        filtered.sort((a, b) => {{
            let va, vb;
            if (sortCol === 'stars') {{ va = a.stars; vb = b.stars; }}
            else if (sortCol === 'date') {{ va = a.date; vb = b.date; }}
            else if (sortCol === 'name') {{ va = a.name.toLowerCase(); vb = b.name.toLowerCase(); }}
            else if (sortCol === 'status') {{ va = a.status_sort; vb = b.status_sort; }}
            else if (sortCol === 'age') {{
                va = a.age === '—' ? -1 : parseInt(a.age);
                vb = b.age === '—' ? -1 : parseInt(b.age);
            }}
            else {{ va = a.num; vb = b.num; }}
            if (va < vb) return sortAsc ? -1 : 1;
            if (va > vb) return sortAsc ? 1 : -1;
            return 0;
        }});
    }}

    // Build table
    if (filtered.length === 0) {{
        tbody.innerHTML = '<tr><td colspan="6" class="empty">No repos match your filter</td></tr>';
        document.getElementById('resultCount').textContent = '0 / ' + data.length;
        return;
    }}
    document.getElementById('resultCount').textContent = filtered.length + ' / ' + data.length;
    tbody.innerHTML = filtered.map(r => `
        <tr>
            <td class="num">${{r.num}}</td>
            <td><a href="${{r.url}}" target="_blank">${{r.name}}</a></td>
            <td class="date">${{r.date}}</td>
            <td>${{r.age}}</td>
            <td class="stars">${{r.stars.toLocaleString()}}</td>
            <td>${{r.status_html}}</td>
        </tr>
    `).join('');

    // Update arrows
    document.querySelectorAll('th .arrow').forEach(a => a.remove());
    if (sortCol !== null) {{
        const th = document.getElementById('th-' + sortCol);
        if (th) {{
            const arrow = document.createElement('span');
            arrow.className = 'arrow';
            arrow.textContent = sortAsc ? ' ▲' : ' ▼';
            th.appendChild(arrow);
        }}
    }}
}}

function sortBy(col) {{
    if (sortCol === col) {{ sortAsc = !sortAsc; }}
    else {{ sortCol = col; sortAsc = true; }}
    render();
}}

document.addEventListener('DOMContentLoaded', () => {{
    document.getElementById('searchBox').addEventListener('input', render);
    document.getElementById('statusFilter').addEventListener('change', render);
    render();
}});
"""

    HTML = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Repository Freshness Report</title>
<style>{CSS}</style>
</head>
<body>
<div class="wrap">
<h1>📊 Repository Freshness Report</h1>
<div class="sub">
    <span class="health {health_class}">{health_emoji} {health_label}</span>
    &nbsp; Generated: {now.strftime('%Y-%m-%d %H:%M UTC')} &nbsp;·&nbsp; {total} repos
</div>

<div class="stats">
    <span>⭐ {total_stars:,} total stars</span>
    <span>📦 {archived} archived</span>
    <span>⚠️ {total_err} errors</span>
    <span>📋 <span id="resultCount">{total_ok} / {total_ok}</span> shown</span>
</div>

<h2>📋 Summary</h2>
<table>
<thead><tr><th>Category</th><th>Count</th><th>Share</th></tr></thead>
<tbody>{summary_rows}</tbody>
</table>

<h2>📌 Repositories</h2>
<div class="controls">
    <label for="searchBox">🔍 Search:</label>
    <input type="text" id="searchBox" placeholder="Repo name or date…">
    <label for="statusFilter">Status:</label>
    <select id="statusFilter">
        <option value="all">All</option>
        <option value="active">🟢 Active</option>
        <option value="aging">🟡 Aging</option>
        <option value="old">🟠 Old</option>
        <option value="stale">🔴 Stale</option>
        <option value="archived">📦 Archived</option>
    </select>
</div>
<table>
<thead>
<tr>
    <th id="th-num" onclick="sortBy('num')" style="width:36px">#<span class="arrow"> ▲</span></th>
    <th id="th-name" onclick="sortBy('name')">Repository</th>
    <th id="th-date" onclick="sortBy('date')">Last Commit</th>
    <th id="th-age" onclick="sortBy('age')">Age</th>
    <th id="th-stars" onclick="sortBy('stars')">⭐</th>
    <th id="th-status" onclick="sortBy('status')">Status</th>
</tr>
</thead>
<tbody id="repoBody"></tbody>
</table>
"""

    if errors:
        HTML += f"""<h2>⚠️ Errors ({err_count})</h2>
<table>
<thead><tr><th>#</th><th>Repository</th><th>Error</th></tr></thead>
<tbody>{err_rows}</tbody>
</table>
"""

    HTML += f"""<div class="footer">
Repo Freshness Checker v{VERSION} &nbsp;·&nbsp; Generated {now.strftime('%Y-%m-%d %H:%M UTC')}
</div>
</div>
<script>{JS}</script>
</body>
</html>"""

    Path(path).write_text(HTML, encoding="utf-8")


# ═══════════════════════════ GUI ════════════════════════════════
def run_gui():
    """Modern dark-themed GUI with tkinter."""
    import tkinter as tk
    from tkinter import ttk, filedialog, messagebox, scrolledtext
    import webbrowser

    # ── colour palette ────────────────────────────────────────
    class Palette:
        BG        = "#1e1e2e"  # base
        SURFACE   = "#2a2a3c"  # surface0
        SURF_ALT  = "#313244"  # surface1
        TEXT      = "#cdd6f4"  # text
        SUBTEXT   = "#a6adc8"  # subtext0
        ACCENT    = "#89b4fa"  # blue
        GREEN     = "#a6e3a1"  # green
        RED       = "#f38ba8"  # red
        YELLOW    = "#f9e2af"  # yellow
        BORDER    = "#45475a"  # surface2
        HEADING   = "#b4befe"  # lavender

    # ── ttk theme builder ──────────────────────────────────────
    def _build_theme(style: ttk.Style) -> str:
        theme = "freshness"
        # Try to use an existing theme as base — "alt" works cross-platform
        available = style.theme_names()
        base = "alt" if "alt" in available else "default"
        style.theme_use(base)
        # We configure our custom colours on top of the base theme
        style.theme_create(theme, base, {
            "TFrame":       {"configure": {"background": Palette.BG}},
            "TLabel":       {"configure": {"background": Palette.BG,
                                           "foreground": Palette.TEXT}},
            "TButton":      {"configure": {"background": Palette.SURFACE,
                                           "foreground": Palette.TEXT,
                                           "borderwidth": 0,
                                           "padding": (16, 6)},
                             "map": {"background": [("active", Palette.ACCENT),
                                                    ("disabled", Palette.SURF_ALT)],
                                     "foreground": [("active", Palette.BG),
                                                    ("disabled", Palette.SUBTEXT)]}},
            "TCheckbutton": {"configure": {"background": Palette.BG,
                                           "foreground": Palette.TEXT}},
            "TEntry":       {"configure": {"fieldbackground": Palette.SURF_ALT,
                                           "foreground": Palette.TEXT,
                                           "insertcolor": Palette.TEXT}},
            "TSpinbox":     {"configure": {"fieldbackground": Palette.SURF_ALT,
                                           "foreground": Palette.TEXT,
                                           "buttonbackground": Palette.SURFACE}},
            "TLabelFrame":  {"configure": {"background": Palette.BG,
                                           "foreground": Palette.HEADING,
                                           "borderwidth": 1}},
            "TProgressbar": {"configure": {"background": Palette.ACCENT,
                                           "troughcolor": Palette.SURF_ALT,
                                           "borderwidth": 0}},
            "Horizontal.TProgressbar":
                            {"configure": {"background": Palette.ACCENT,
                                           "troughcolor": Palette.SURF_ALT,
                                           "borderwidth": 0}},
        })
        # Style for prominent action button
        style.configure("Accent.TButton", background=Palette.ACCENT,
                        foreground=Palette.BG, font=("sans-serif", 10, "bold"))
        style.map("Accent.TButton",
                  background=[("active", "#74c7ec"), ("disabled", Palette.SURF_ALT)],
                  foreground=[("disabled", Palette.SUBTEXT)])
        style.configure("Stop.TButton", background=Palette.RED,
                        foreground=Palette.TEXT)
        style.map("Stop.TButton",
                  background=[("active", "#e64553"), ("disabled", Palette.SURF_ALT)])
        style.configure("Status.TLabel", background=Palette.SURFACE,
                        foreground=Palette.SUBTEXT, relief="sunken",
                        padding=(8, 2))
        style.configure("Heading.TLabel", font=("sans-serif", 11, "bold"),
                        foreground=Palette.HEADING)
        style.configure("Link.TLabel", foreground=Palette.ACCENT,
                        background=Palette.BG)
        style.theme_use(theme)
        return theme

    class App(tk.Tk):
        def __init__(self):
            super().__init__()
            self.title(f"GitHub Repo Freshness Checker  v{VERSION}")
            self.geometry("880x680")
            self.minsize(720, 520)
            self.cancel_event = threading.Event()
            self.running = False
            self.last_results = None
            self.last_errors = None

            # Apply dark theme
            style = ttk.Style(self)
            _build_theme(style)

            # Configure root window
            self.configure(bg=Palette.BG)
            self.option_add("*foreground", Palette.TEXT)
            self.option_add("*background", Palette.BG)

            # Configure tk widgets that ttk doesn't cover
            self._tk_config()

            self._build()
            saved = load_token()
            if saved:
                self.tok_var.set(saved)
            self._load_config()

        def _tk_config(self):
            """Style plain tk widgets (not covered by ttk)."""
            self.option_add("*Entry.background", Palette.SURF_ALT)
            self.option_add("*Entry.foreground", Palette.TEXT)
            self.option_add("*Entry.insertBackground", Palette.TEXT)
            self.option_add("*Entry.highlightBackground", Palette.BORDER)
            self.option_add("*Entry.highlightColor", Palette.ACCENT)
            self.option_add("*Listbox.background", Palette.SURF_ALT)
            self.option_add("*Listbox.foreground", Palette.TEXT)
            self.option_add("*Text.background", Palette.SURF_ALT)
            self.option_add("*Text.foreground", Palette.TEXT)
            self.option_add("*Text.insertBackground", Palette.TEXT)

        # ── build UI ──────────────────────────────────────────
        def _build(self):
            pad = dict(padx=8, pady=5)
            main = ttk.Frame(self, padding=14)
            main.pack(fill="both", expand=True)

            # ── Header ────────────────────────────────────────
            header = ttk.Frame(main)
            header.pack(fill="x", **pad)
            ttk.Label(header, text="🔍 Repo Freshness Checker",
                      style="Heading.TLabel").pack(side="left")
            ttk.Label(header, text=f"v{VERSION}",
                      foreground=Palette.SUBTEXT).pack(side="left", padx=(6, 0))

            # ── Token section ─────────────────────────────────
            tf = ttk.LabelFrame(main, text="Authentication", padding=10)
            tf.pack(fill="x", **pad)

            # Token entry row
            row0 = ttk.Frame(tf)
            row0.pack(fill="x")
            ttk.Label(row0, text="Personal Access Token:").pack(side="left")
            self.tok_var = tk.StringVar()
            self.tok_entry = tk.Entry(row0, textvariable=self.tok_var,
                                      width=48, show="●",
                                      bg=Palette.SURF_ALT, fg=Palette.TEXT,
                                      insertbackground=Palette.TEXT,
                                      relief="flat", highlightthickness=1,
                                      highlightbackground=Palette.BORDER,
                                      highlightcolor=Palette.ACCENT)
            self.tok_entry.pack(side="left", fill="x", expand=True, padx=6)
            self._show_tok = False
            self.eye_btn = ttk.Button(row0, text="Show", width=5,
                                      command=self._toggle_tok)
            self.eye_btn.pack(side="left", padx=1)
            ttk.Button(row0, text="Save", width=5,
                       command=self._save_tok).pack(side="left", padx=1)
            ttk.Button(row0, text="Clear", width=5,
                       command=self._clear_tok).pack(side="left", padx=1)

            # Clickable token link row
            row1 = ttk.Frame(tf)
            row1.pack(fill="x", pady=(6, 0))
            link_lbl = tk.Label(row1,
                text="🔑 Generate a token (no scopes needed for public repos)",
                fg=Palette.ACCENT, bg=Palette.BG,
                cursor="hand2", font=("sans-serif", 9))
            link_lbl.pack(side="left")
            link_lbl.bind("<Button-1>", lambda e: webbrowser.open(
                "https://github.com/settings/tokens"))
            link_lbl.bind("<Enter>", lambda e: link_lbl.configure(
                font=("sans-serif", 9, "underline")))
            link_lbl.bind("<Leave>", lambda e: link_lbl.configure(
                font=("sans-serif", 9)))

            # ── Files section ─────────────────────────────────
            ff = ttk.LabelFrame(main, text="Files", padding=10)
            ff.pack(fill="x", **pad)

            # Input
            fi0 = ttk.Frame(ff)
            fi0.pack(fill="x")
            ttk.Label(fi0, text="Input file:").pack(side="left")
            self.in_var = tk.StringVar()
            self.in_entry = tk.Entry(fi0, textvariable=self.in_var,
                                     bg=Palette.SURF_ALT, fg=Palette.TEXT,
                                     insertbackground=Palette.TEXT,
                                     relief="flat", highlightthickness=1,
                                     highlightbackground=Palette.BORDER,
                                     highlightcolor=Palette.ACCENT)
            self.in_entry.pack(side="left", fill="x", expand=True, padx=6)
            ttk.Button(fi0, text="Browse…",
                       command=self._browse_in).pack(side="left")



            # Output
            fi1 = ttk.Frame(ff)
            fi1.pack(fill="x", pady=(8, 0))
            ttk.Label(fi1, text="Output file:").pack(side="left")
            self.out_var = tk.StringVar(value="freshness_report.md")
            tk.Entry(fi1, textvariable=self.out_var,
                     bg=Palette.SURF_ALT, fg=Palette.TEXT,
                     insertbackground=Palette.TEXT,
                     relief="flat", highlightthickness=1,
                     highlightbackground=Palette.BORDER,
                     highlightcolor=Palette.ACCENT).pack(
                         side="left", fill="x", expand=True, padx=6)
            ttk.Button(fi1, text="Browse…",
                       command=self._browse_out).pack(side="left")

            # ── Controls ──────────────────────────────────────
            cf = ttk.Frame(main)
            cf.pack(fill="x", **pad)

            self.start_btn = ttk.Button(
                cf, text="▶  Start Checking", style="Accent.TButton",
                command=self._start)
            self.start_btn.pack(side="left")

            self.stop_btn = ttk.Button(
                cf, text="⬛  Stop", style="Stop.TButton",
                command=self._stop, state="disabled")
            self.stop_btn.pack(side="left", padx=6)

            self.open_btn = ttk.Button(
                cf, text="📂 Open Report", command=self._open_report,
                state="disabled")
            self.open_btn.pack(side="left")

            self.html_btn = ttk.Button(
                cf, text="🌐 Export HTML", command=self._export_html,
                state="disabled")
            self.html_btn.pack(side="left", padx=6)

            ttk.Label(cf, text="Workers:").pack(side="left", padx=(24, 2))
            self.workers_var = tk.IntVar(value=DEFAULT_WORKERS)
            self.workers_spin = ttk.Spinbox(
                cf, from_=1, to=50, width=4,
                textvariable=self.workers_var)
            self.workers_spin.pack(side="left")

            # ── Progress ──────────────────────────────────────
            pf = ttk.Frame(main)
            pf.pack(fill="x", **pad)
            self.prog = ttk.Progressbar(pf, mode="determinate")
            self.prog.pack(side="left", fill="x", expand=True)
            self.prog_lbl = ttk.Label(pf, text="  0 / 0", width=26)
            self.prog_lbl.pack(side="left", padx=6)

            # ── Log ───────────────────────────────────────────
            lf = ttk.LabelFrame(main, text="Log", padding=6)
            lf.pack(fill="both", expand=True, **pad)

            if sys.platform == "win32":
                log_font = ("Consolas", 10)
            elif sys.platform == "darwin":
                log_font = ("Menlo", 11)
            else:
                log_font = ("monospace", 10)

            self.log = scrolledtext.ScrolledText(
                lf, height=12, state="disabled", wrap="word",
                font=log_font,
                bg=Palette.SURF_ALT, fg=Palette.TEXT,
                insertbackground=Palette.TEXT,
                relief="flat", borderwidth=0,
                padx=6, pady=4)
            self.log.pack(fill="both", expand=True)

            # Colour tags for log
            self.log.tag_config("ok", foreground=Palette.GREEN)
            self.log.tag_config("err", foreground=Palette.RED)
            self.log.tag_config("info", foreground=Palette.SUBTEXT)
            self.log.tag_config("warn", foreground=Palette.YELLOW)
            self.log.tag_config("accent", foreground=Palette.ACCENT)
            self.log.tag_config("bold", font=(log_font[0], log_font[1], "bold"))

            # ── Status bar ────────────────────────────────────
            self.status_var = tk.StringVar(value="Ready")
            status_bar = ttk.Label(main, textvariable=self.status_var,
                                   style="Status.TLabel")
            status_bar.pack(fill="x", **pad)

        # ── drag & drop ──────────────────────────────────────
        def _setup_drag_drop(self):
            try:
                self.in_entry.drop_target_register("*")
                self.in_entry.dnd_bind("<<Drop>>", self._on_drop)
                self.in_entry.master.drop_target_register("*")
                self.in_entry.master.dnd_bind("<<Drop>>", self._on_drop)
            except (AttributeError, tk.TclError):
                self.in_entry.bind("<Button-3>", self._paste_context_menu)
                self.in_entry.bind("<<Paste>>", self._on_paste)

        def _on_drop(self, event):
            raw = getattr(event, "data", "")
            if not raw:
                return
            path = raw.strip("{}").strip()
            if path.startswith("file://"):
                path = path[7:]
            if path.startswith("file:"):
                path = path[5:]
            from urllib.parse import unquote
            path = unquote(path)
            if Path(path).is_file():
                self.in_var.set(str(Path(path).resolve()))

        def _on_paste(self, event=None):
            self.after(10, self._check_clipboard_for_path)

        def _paste_context_menu(self, event):
            menu = tk.Menu(self, tearoff=0, bg=Palette.SURFACE,
                           fg=Palette.TEXT, activebackground=Palette.ACCENT,
                           activeforeground=Palette.BG)
            menu.add_command(label="Paste path",
                             command=self._check_clipboard_for_path)
            menu.add_command(label="Browse…", command=self._browse_in)
            menu.tk_popup(event.x_root, event.y_root)

        def _check_clipboard_for_path(self):
            try:
                raw = self.clipboard_get().strip()
                path = raw.strip("'\"").strip()
                if path.startswith("file://"):
                    path = path[7:]
                if Path(path).is_file():
                    self.in_var.set(str(Path(path).resolve()))
            except (tk.TclError, OSError):
                pass

        # ── config persistence ────────────────────────────────
        CONFIG_FILE = CONFIG_DIR / "gui_config.json"

        def _load_config(self):
            try:
                if self.CONFIG_FILE.exists():
                    data = json.loads(self.CONFIG_FILE.read_text())
                    if "last_input" in data:
                        p = data["last_input"]
                        if Path(p).exists():
                            self.in_var.set(p)
                    if "last_output" in data:
                        self.out_var.set(data["last_output"])
                    if "last_workers" in data:
                        self.workers_var.set(data["last_workers"])
            except (json.JSONDecodeError, OSError):
                pass

        def _save_config(self):
            try:
                CONFIG_DIR.mkdir(parents=True, exist_ok=True)
                data = {
                    "last_input": self.in_var.get(),
                    "last_output": self.out_var.get(),
                    "last_workers": self.workers_var.get(),
                }
                self.CONFIG_FILE.write_text(
                    json.dumps(data, indent=2), encoding="utf-8")
            except OSError:
                pass

        # ── callbacks ─────────────────────────────────────────
        def _toggle_tok(self):
            self._show_tok = not self._show_tok
            self.tok_entry.config(show="" if self._show_tok else "●")
            self.eye_btn.config(text="Hide" if self._show_tok else "Show")

        def _save_tok(self):
            t = self.tok_var.get().strip()
            if not t:
                messagebox.showwarning("Token", "Enter a token first.")
                return
            # Validate token format before saving
            is_valid, msg = validate_token(t)
            if not is_valid:
                if not messagebox.askyesno("Token Warning",
                        f"{msg}.\n\nSave anyway?"):
                    return
            save_token(t)
            messagebox.showinfo("Token Saved",
                f"Token saved securely.\n"
                f"Location: {TOKEN_FILE}\n\n"
                "Note: Token is stored in plaintext.\n"
                "Use 'Clear' to remove it from disk when done.")

        def _clear_tok(self):
            self.tok_var.set("")
            clear_saved_token()

        def _browse_in(self):
            p = filedialog.askopenfilename(
                title="Select input file",
                filetypes=[("All files", "*.*"),
                           ("Markdown", "*.md"),
                           ("Text", "*.txt")])
            if p:
                self.in_var.set(p)

        def _browse_out(self):
            p = filedialog.asksaveasfilename(
                title="Save report as",
                defaultextension=".md",
                filetypes=[("Markdown", "*.md")])
            if p:
                self.out_var.set(p)

        def _open_report(self):
            p = self.out_var.get()
            if not Path(p).exists():
                return
            import subprocess, platform
            s = platform.system()
            if s == "Darwin":
                subprocess.Popen(["open", p])
            elif s == "Windows":
                os.startfile(p)
            else:
                subprocess.Popen(["xdg-open", p])

        def _export_html(self):
            """Open the companion HTML report (auto-generated alongside .md)."""
            md_path = self.out_var.get()
            html_path = str(Path(md_path).with_suffix('.html'))
            if not Path(html_path).exists():
                # Regenerate from stored data if available
                results = getattr(self, 'last_results', None)
                errors = getattr(self, 'last_errors', None)
                if results is not None and errors is not None:
                    generate_html_report(results, errors, html_path)
                else:
                    messagebox.showerror("Error", "No report data available. Run a check first.")
                    return
            import subprocess, platform
            s = platform.system()
            if s == "Darwin":
                subprocess.Popen(["open", html_path])
            elif s == "Windows":
                os.startfile(html_path)
            else:
                subprocess.Popen(["xdg-open", html_path])

        def _log(self, msg: str):
            """Log with automatic tag detection based on emoji prefixes."""
            msg = self._sanitize(msg)
            self.log.config(state="normal")
            # Determine tag from message prefix
            tag = None
            if msg.startswith("✅") or msg.startswith("📝"):
                tag = "ok"
            elif msg.startswith("❌") or msg.startswith("💥"):
                tag = "err"
            elif msg.startswith("⏳") or msg.startswith("⚠"):
                tag = "warn"
            elif msg.startswith("🔑") or msg.startswith("⚙"):
                tag = "accent"
            elif msg.startswith("["):
                # Line like "[1/523] ✅ ..."
                tag = "info"
            if tag:
                self.log.insert("end", msg + "\n", tag)
            else:
                self.log.insert("end", msg + "\n")
            self.log.see("end")
            self.log.config(state="disabled")

        def _progress(self, cur, total, dyn_info=None):
            pct = cur / total * 100 if total else 0
            self.prog["value"] = pct
            label = f"  {cur} / {total}  ({pct:.1f}%)"
            if dyn_info and dyn_info.get("eta", 0) > 0:
                eta = dyn_info["eta"]
                if eta >= 3600:
                    label += f"  ⏱ ETA: {eta/3600:.1f}h"
                elif eta >= 60:
                    label += f"  ⏱ ETA: {eta/60:.0f}m"
                else:
                    label += f"  ⏱ ETA: {eta:.0f}s"
            self.prog_lbl.config(text=label)

        # ── threaded work ─────────────────────────────────────
        def _start(self):
            inp = self.in_var.get().strip()
            out = self.out_var.get().strip()
            tok = self.tok_var.get().strip()
            if not inp or not Path(inp).is_file():
                messagebox.showerror("Error", "Select a valid input file.")
                return
            if not out:
                messagebox.showerror("Error", "Specify an output file.")
                return
            if not tok:
                if not messagebox.askyesno(
                    "No token",
                    "Without a token the rate limit is 60 req/hr.\n"
                    "For 500+ repos this will take hours.\n\nContinue anyway?"
                ):
                    return

            self.running = True
            self.cancel_event.clear()
            self.start_btn.config(state="disabled")
            self.stop_btn.config(state="normal")
            self.open_btn.config(state="disabled")
            self.html_btn.config(state="disabled")
            self.log.config(state="normal")
            self.log.delete("1.0", "end")
            self.log.config(state="disabled")
            self.status_var.set("Extracting URLs …")

            t = threading.Thread(target=self._worker,
                                 args=(inp, out, tok), daemon=True)
            t.start()

        def _stop(self):
            self.cancel_event.set()
            self.stop_btn.config(state="disabled")
            self.status_var.set("Cancelling …")

        def _worker(self, inp, out, tok):
            try:
                self._safe_log("📂 Reading input file …")
                repos = extract_repos(inp)
                self._safe_log(f"🔍 Found {len(repos)} unique GitHub repos")
                if not repos:
                    self._safe_status("No repos found.")
                    self._finish()
                    return

                workers = self.workers_var.get()
                self._safe_log(f"⚙  Using {workers} concurrent workers")
                self._safe_status("Checking repos …")
                results, errors = process_repos(
                    repos, tok,
                    progress_cb=self._safe_progress,
                    log_cb=self._safe_log,
                    cancel=self.cancel_event,
                    max_workers=workers,
                )

                # Store for HTML export
                self.after(0, lambda: setattr(self, 'last_results', results))
                self.after(0, lambda: setattr(self, 'last_errors', errors))

                if results or errors:
                    generate_report(results, errors, out)
                    # Also generate HTML companion file alongside the .md
                    html_path = str(Path(out).with_suffix('.html'))
                    generate_html_report(results, errors, html_path)
                    self._safe_log(f"\n📝 Report saved → {out}")
                    self._safe_log(f"🌐 HTML report → {html_path}")
                    self._safe_log(
                        f"   ✅ {len(results)} repos  |  ❌ {len(errors)} errors")
                    self._safe_status(f"Done — report saved to {out}")
                    self.after(0, lambda: self.open_btn.config(state="normal"))
                    self.after(0, lambda: self.html_btn.config(state="normal"))
                else:
                    self._safe_status("Nothing to report.")
            except Exception as exc:
                self._safe_log(f"\n💥 ERROR: {exc}")
                self._safe_status(f"Error: {exc}")
            finally:
                self._finish()
                self.after(0, self._save_config)

        def _finish(self):
            self.running = False
            self.after(0, lambda: self.start_btn.config(state="normal"))
            self.after(0, lambda: self.stop_btn.config(state="disabled"))

        def _sanitize(self, text: str) -> str:
            """Redact token from any displayed text to prevent accidental leaks."""
            token = self.tok_var.get().strip()
            if token and token in text:
                text = text.replace(token, "***")
            return text

        # thread-safe helpers
        def _safe_log(self, msg):
            self.after(0, self._log, msg)

        def _safe_progress(self, cur, total, dyn_info=None):
            self.after(0, self._progress, cur, total, dyn_info)

        def _safe_status(self, msg):
            self.after(0, lambda m=msg: self.status_var.set(self._sanitize(m)))

    app = App()
    app.mainloop()

# ═══════════════════════════ CLI ════════════════════════════════
def run_cli():
    ap = argparse.ArgumentParser(
        description="Check GitHub repo freshness and generate a Markdown report."
    )
    ap.add_argument("input_file", help="File containing GitHub URLs")
    ap.add_argument("-o", "--output", default="freshness_report.md",
                    help="Output path  (default: freshness_report.md)")
    ap.add_argument("-f", "--format", choices=["md", "html", "both"],
                    default="md",
                    help="Output format(s): md (default), html, or both")
    ap.add_argument("-t", "--token", default=None,
                    help="GitHub Personal Access Token")
    ap.add_argument("--save-token", action="store_true",
                    help="Save the supplied token for future runs")
    ap.add_argument("-w", "--workers", type=int, default=DEFAULT_WORKERS,
                    help=f"Concurrent API workers (default: {DEFAULT_WORKERS})")
    args = ap.parse_args()

    token = args.token or load_token()
    if args.save_token and args.token:
        save_token(args.token)
        print(f"✓ Token saved to {TOKEN_FILE}")

    if not token:
        print("⚠  No token — rate limit is 60 req/hr.  "
              "Pass --token or set GITHUB_TOKEN.")

    repos = extract_repos(args.input_file)
    print(f"🔍  Found {len(repos)} unique GitHub repos in {args.input_file}")
    if not repos:
        sys.exit(0)

    print(f"⚙  Using {args.workers} concurrent workers")
    start = time.time()

    def _cli_progress(cur, total, dyn_info=None):
        pct = cur / total * 100 if total else 0
        label = f"  Progress: {cur}/{total}  ({pct:.1f}%)"
        if dyn_info and dyn_info.get("eta", 0) > 0:
            eta = dyn_info["eta"]
            if eta >= 3600:
                label += f"  ETA: {eta/3600:.1f}h"
            elif eta >= 60:
                label += f"  ETA: {eta/60:.0f}m"
            else:
                label += f"  ETA: {eta:.0f}s"
        print(f"\r{label:<72}", end="", flush=True)

    results, errors = process_repos(
        repos, token,
        progress_cb=_cli_progress,
        log_cb=lambda m: print(f"\r{m:<80}"),
        max_workers=args.workers,
    )
    elapsed = time.time() - start
    print()

    generate_report(results, errors, args.output)
    print(f"\n📝  Report saved → {args.output}")

    if args.format in ("html", "both"):
        html_path = str(Path(args.output).with_suffix('.html'))
        generate_html_report(results, errors, html_path)
        print(f"🌐  HTML report  → {html_path}")

    print(f"    ✅ {len(results)} repos  |  ❌ {len(errors)} errors  "
          f"|  ⏱ {elapsed:.1f}s")

# ════════════════════════ entry point ═══════════════════════════
if __name__ == "__main__":
    if len(sys.argv) > 1 and not sys.argv[1].startswith("--gui"):
        run_cli()
    else:
        run_gui()