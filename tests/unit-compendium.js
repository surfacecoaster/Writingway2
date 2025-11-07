const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const projectRoot = path.resolve(__dirname, '..');
    const fileUrl = process.env.APP_URL || ('file:///' + path.join(projectRoot, 'main.html').replace(/\\/g, '/'));

    console.log('Opening:', fileUrl);
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    page.on('console', msg => { try { console.log(`PAGE LOG [${msg.type()}] ${msg.text()}`); } catch (e) { } });
    page.on('pageerror', err => { console.error('PAGE ERROR', err && err.message ? err.message : err); });

    try {
        await page.goto(fileUrl, { waitUntil: 'load', timeout: 15000 });
        await page.waitForSelector('.app-container, .welcome-screen', { timeout: 10000 });

        // Seed project
        const proj = await page.evaluate(async () => await window.__test.seedProject('CompTest'));

        // Seed compendium entries via API
        const entries = await page.evaluate(async (pid) => {
            return await window.__test.seedCompendium(pid, [
                { category: 'character', title: 'Alice', body: 'Alice is a cautious detective.' },
                { category: 'location', title: 'Old Harbor', body: 'The Old Harbor smells of salt and diesel.' }
            ]);
        }, proj.id);

        if (!Array.isArray(entries) || entries.length < 2) {
            console.error('Compendium seed failed:', entries);
            await browser.close();
            process.exit(2);
        }

        // Test search
        const search = await page.evaluate(async (pid) => {
            return await window.Compendium.search(pid, 'Alice');
        }, proj.id);

        if (!(Array.isArray(search) && search.length >= 1 && search[0].title === 'Alice')) {
            console.error('Compendium search failed:', search);
            await browser.close();
            process.exit(3);
        }

        // Test getEntry
        const fetched = await page.evaluate(async (id) => await window.Compendium.getEntry(id), entries[0].id);
        if (!fetched || fetched.title !== 'Alice') {
            console.error('Compendium getEntry failed:', fetched);
            await browser.close();
            process.exit(4);
        }

        console.log('unit-compendium test passed.');
        await browser.close();
        process.exit(0);
    } catch (err) {
        console.error('unit-compendium test failed:', err && err.message ? err.message : err);
        await browser.close();
        process.exit(1);
    }
})();
