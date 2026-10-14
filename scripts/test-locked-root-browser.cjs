// Optional browser checks: install Playwright and @axe-core/playwright in an external test environment.
// Run against docs:preview; SITE_URL, PLAYWRIGHT_MODULE, AXE_PLAYWRIGHT_MODULE and
// CHROMIUM_EXECUTABLE_PATH can select an external installation/browser. No site dependencies added.
const { chromium: pw } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await pw.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined, args: ['--no-sandbox'], headless: true });
 const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } }); const page = await context.newPage();
 const errors=[]; page.on('pageerror', e=>errors.push(e.message));
 const url = `${process.env.SITE_URL || 'http://localhost:4173'}/rooting-guides/root-without-unlocking-bootloader`;
 await page.goto(url); await page.waitForSelector('.root-controls input:not([disabled])');
 assert.equal(await page.locator('#root-tools-table tbody tr').count(),45);
 await page.getByRole('link',{name:'Jump directly to the Apps & Tools table',exact:true}).click();
 await page.waitForFunction(()=>location.hash==='#apps-tools');
 await page.waitForTimeout(700);
 let heading=await page.locator('#apps-tools').boundingBox(); console.log('Desktop anchor y',heading.y); assert.ok(heading.y>=64 && heading.y<400);
 const search=page.getByRole('searchbox'); await search.fill('sm-a175f 6.12.38');
 assert.equal(await page.locator('#root-tools-table tbody tr').count(),1);
 assert.match(await page.locator('#root-tools-table tbody').innerText(),/GhostLock Galaxy A17/);
 await search.fill('no-such-tool-xyz'); assert.match(await page.locator('#root-tools-table tbody').innerText(),/No results match/);
 await page.getByRole('button',{name:'Reset search and filters'}).click();
 await page.getByLabel('Verification',{exact:true}).selectOption('Reported');
 await page.getByLabel('Project status',{exact:true}).selectOption('Archived');
 assert.equal(await page.locator('#root-tools-table tbody tr').count(),1);
 assert.match(await page.locator('#root-tools-table tbody').innerText(),/DirtyFrag Android Root\/Jailbreak/);
 await page.getByRole('button',{name:'Reset search and filters'}).click();
 await page.getByRole('button',{name:'App / Tool',exact:false}).click();
 assert.equal(await page.locator('#root-tools-table thead th').first().getAttribute('aria-sort'),'descending');
 await page.getByRole('button',{name:'App / Tool',exact:false}).click();
 assert.equal(await page.locator('#root-tools-table thead th').first().getAttribute('aria-sort'),'ascending');
 await page.getByLabel('Documented Android OS version').selectOption('17'); assert.match(await page.locator('#root-tools-table tbody').innerText(),/LSPromise/);
 await page.getByRole('button',{name:'Reset search and filters'}).click();
 await page.locator('summary').first().click(); assert.ok(await page.locator('details[open] li').count()>0);

 await page.setViewportSize({width:390,height:844});
 await page.goto(url+'#apps-tools'); await page.waitForSelector('.root-controls input:not([disabled])'); await page.waitForTimeout(700);
 heading=await page.locator('#apps-tools').boundingBox(); console.log('Mobile direct-fragment y',heading.y); assert.ok(heading.y>=64 && heading.y<400);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth), 'page must not overflow viewport');
 const region=page.getByRole('region',{name:'Rooting tools table, scroll horizontally'});
 await region.focus(); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(200);
 assert.ok(await region.evaluate(e=>e.scrollLeft>0),'keyboard horizontal scroll');
 await region.evaluate(e=>e.scrollLeft=0);
 await page.locator('html').evaluate(e=>e.classList.add('dark'));
 await page.waitForTimeout(1000);
 const AxeBuilder = require(process.env.AXE_PLAYWRIGHT_MODULE || '@axe-core/playwright').default;
 for (const dark of [true,false]) { await page.locator('html').evaluate((e,dark)=>e.classList.toggle('dark',dark),dark); await page.waitForTimeout(600); const axe=await new AxeBuilder({page}).include('.root-reference').analyze(); console.log(dark?'Dark':'Light','axe violations:',axe.violations.map(v=>v.id)); assert.deepEqual(axe.violations,[]); }
 assert.equal(errors.length,0,errors.join('\n'));
 const nojs = await browser.newContext({ javaScriptEnabled:false }); const staticPage=await nojs.newPage();await staticPage.goto(url+'#apps-tools');assert.equal(await staticPage.locator('#root-tools-table tbody tr').count(),45); await nojs.close();
 console.log('PASS: 45 SSR rows, hydration, search, empty state, combined filters, Android filter, sorting, reset, profile expansion, anchors, mobile width, keyboard scroll, dark theme, no-JS fallback; no page errors');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)})
