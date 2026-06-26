const fs = require('fs');
const path = require('path');

// Colors for output
const COLORS = {
    GREEN: '\x1b[32m',
    RED: '\x1b[31m',
    BLUE: '\x1b[34m',
    YELLOW: '\x1b[33m',
    NC: '\x1b[0m' // No Color
};

// Track warnings so we can fail the build if any occur
let warningCount = 0;

// Logging functions
const logInfo = (msg) => console.log(`${COLORS.GREEN}✓ ${msg}${COLORS.NC}`);
const logWarn = (msg) => {
    warningCount++;
    console.log(`${COLORS.YELLOW}⚠ ${msg}${COLORS.NC}`);
};
const logError = (msg) => console.error(`${COLORS.RED}✗ ${msg}${COLORS.NC}`);
const handleError = (msg) => {
    logError(msg);
    process.exit(1);
};

console.log(`${COLORS.GREEN}Starting build-docs process...${COLORS.NC}`);

// Paths
const ROOT_DIR = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const README_PATH = path.join(ROOT_DIR, 'README.md');
const APPS_MODULES_DIR = path.join(DOCS_DIR, 'apps-and-modules');
const INDEX_MD_PATH = path.join(APPS_MODULES_DIR, 'index.md');

// 1. Check required files and directories
if (!fs.existsSync(DOCS_DIR)) handleError("'docs' directory not found.");
if (!fs.existsSync(README_PATH)) handleError("'README.md' not found.");

// 2. Create apps-and-modules directory if it doesn't exist
if (!fs.existsSync(APPS_MODULES_DIR)) {
    try {
        fs.mkdirSync(APPS_MODULES_DIR, { recursive: true });
        logInfo("Created docs/apps-and-modules directory");
    } catch (err) {
        handleError(`Failed creating apps-and-modules directory: ${err.message}`);
    }
}

// 3. Filter README.md content
const filterReadme = (content) => {
    const lines = content.split('\n');
    const filteredLines = [];
    let deleting = false;
    const startRegex = /<div[^>]*class="[^"]*(mob-tip|toc-overview|intro-header|quick-nav|root-intro|readme-guides|readme-guides-steps|readme-apps-intro)[^"]*"[^>]*>/;
    const endRegex = /<\/div>/;

    for (const line of lines) {
        if (!deleting && startRegex.test(line)) {
            deleting = true;
            // If the end tag is on the same line, we stop deleting immediately after this line (effectively skipping it)
            // But the sed command /start/,/end/d deletes the whole range including start and end lines.
            // So we just don't add this line.
            if (endRegex.test(line)) {
                deleting = false;
            }
            continue;
        }
        if (deleting) {
            if (endRegex.test(line)) {
                deleting = false;
            }
            continue;
        }
        filteredLines.push(line);
    }
    return filteredLines.join('\n');
};

try {
    const readmeContent = fs.readFileSync(README_PATH, 'utf8');
    const filteredReadme = filterReadme(readmeContent);

    const SENTINEL = '<!-- AUTO-GENERATED-CONTENT -->';
    let finalContent = '';

    if (fs.existsSync(INDEX_MD_PATH)) {
        const existingContent = fs.readFileSync(INDEX_MD_PATH, 'utf8');
        const sentinelIndex = existingContent.indexOf(SENTINEL);

        if (sentinelIndex !== -1) {
            // Idempotent mode: keep hand-written header, replace everything after sentinel
            const header = existingContent.substring(0, sentinelIndex + SENTINEL.length);
            finalContent = header + '\n\n' + filteredReadme;
            logInfo("Updated README content in docs/apps-and-modules/index.md");
        } else {
            // Legacy fallback: no sentinel found, append (one-time)
            logWarn("Sentinel '<!-- AUTO-GENERATED-CONTENT -->' not found in index.md — appending.");
            logWarn("Add the sentinel comment after the hand-written header to make builds idempotent.");
            finalContent = existingContent + '\n\n' + filteredReadme;
        }
    } else {
        finalContent = SENTINEL + '\n\n' + filteredReadme;
        logInfo("Created docs/apps-and-modules/index.md with README content");
    }

    // 4. Adjust links and image paths
    // -e '/http[s]*:\/\/\//! s|./docs/rooting-guides/|../rooting-guides/|g'
    // -e '/http[s]*:\/\/\//! s|./docs/|../|g'
    // -e 's|\([^:]\)//|\1/|g'
    // -e 's|docs/public/images/|../public/images/|g'
    // -e 's|\(\[.*\](\)\./docs/|\1/|g'
    // -e 's|\(\[.*\](\)docs/|\1/|g'
    
    let adjustedLines = finalContent.split('\n').map(line => {
        let newLine = line;
        const hasHttp = /http[s]*:\/\//.test(line);

        if (!hasHttp) {
            newLine = newLine.replace(/\.\/docs\/rooting-guides\//g, '../rooting-guides/');
            newLine = newLine.replace(/\.\/docs\//g, '../');
        }

        // s|([^:])//|\1/|g  -> Replace double slashes not preceded by colon
        newLine = newLine.replace(/([^:])\/\//g, '$1/');

        // s|docs/public/images/|../public/images/|g
        newLine = newLine.replace(/docs\/public\/images\//g, '../public/images/');

        // s|(\[.*\]\()\./docs/|\1/|g
        newLine = newLine.replace(/(\[.*\]\()\.\/docs\//g, '$1/');

        // s|(\[.*\]\()docs/|\1/|g
        newLine = newLine.replace(/(\[.*\]\()docs\//g, '$1/');

        return newLine;
    });

    finalContent = adjustedLines.join('\n');
    fs.writeFileSync(INDEX_MD_PATH, finalContent);
    logInfo("Links and image paths adjusted in docs/apps-and-modules/index.md");

    // 7. Add AppSearch component (idempotent — skips if already present)
    const addSearchComponent = () => {
        const content = fs.readFileSync(INDEX_MD_PATH, 'utf8');

        // Skip if AppSearch is already present in the file
        if (content.includes('<AppSearch />')) {
            logInfo("AppSearch component already present, skipping insertion");
            return;
        }

        const lines = content.split('\n');
        
        // Find frontmatter boundaries (YAML frontmatter MUST start on line 0;
        // the closing --- is the second one in the file. We search only the
        // first 500 lines to avoid false-matching horizontal rules deep in
        // the content — the actual frontmatter is ~300 lines of SEO metadata.)
        const frontmatterIndices = [];
        if (lines[0]?.trim() === '---') {
            frontmatterIndices.push(0);
            const searchLimit = Math.min(lines.length, 500);
            for (let i = 1; i < searchLimit; i++) {
                if (lines[i].trim() === '---') {
                    frontmatterIndices.push(i);
                    break;
                }
            }
        }

        if (frontmatterIndices.length < 2) {
            handleError(`Could not find frontmatter markers in ${INDEX_MD_PATH}`);
        }

        // Find content marker
        let contentMarkerIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('## Glossary')) {
                contentMarkerIndex = i;
                break;
            }
        }

        if (contentMarkerIndex === -1) {
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].startsWith('## ')) {
                    contentMarkerIndex = i;
                    break;
                }
            }
        }

        if (contentMarkerIndex === -1) {
            handleError(`Could not find content marker in ${INDEX_MD_PATH}`);
        }

        const headContent = lines.slice(0, contentMarkerIndex).join('\n');
        const tailContent = lines.slice(contentMarkerIndex).join('\n');

        const newContent = `${headContent}

<ClientOnly>
  <AppSearch />
</ClientOnly>

<div class="app-search-content">

${tailContent}

</div>`;

        fs.writeFileSync(INDEX_MD_PATH, newContent);
    };

    addSearchComponent();
    logInfo("Added AppSearch component and wrapped content in docs/apps-and-modules/index.md");

    // 8. Validate generated content
    const validateBuild = () => {
        const content = fs.readFileSync(INDEX_MD_PATH, 'utf8');
        
        if (!content || content.trim().length === 0) {
            handleError("Generated file is empty or does not exist");
        }

        if (!content.includes('AppSearch')) {
            logWarn("AppSearch component not found in generated file");
        }

        if (!content.includes('app-search-content')) {
            logWarn("Content wrapper not found in generated file");
        }

        const lineCount = content.split('\n').length;
        if (lineCount < 100) {
            logWarn(`Generated file seems too short (only ${lineCount} lines)`);
        }

        logInfo("Build validation completed");
    };

    validateBuild();

    if (warningCount > 0) {
        console.log(`\n${COLORS.YELLOW}⚠ Build completed with ${warningCount} warning(s)${COLORS.NC}`);
        process.exit(1);
    }

    console.log(`\n${COLORS.BLUE}═══════════════════════════════════════════════════════════${COLORS.NC}`);
    console.log(`${COLORS.GREEN}✓ Documentation build completed successfully!${COLORS.NC}`);
    console.log(`${COLORS.BLUE}═══════════════════════════════════════════════════════════${COLORS.NC}\n`);

} catch (err) {
    handleError(`Unexpected error: ${err.message}\n${err.stack}`);
}
