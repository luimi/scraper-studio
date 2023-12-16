const puppeteer = require("puppeteer");

module.exports = (url) => {
    return new Promise(async (res, rej) => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
        });
        try {
            const html = await page.content();
            res(html)
        } catch (e) {
            rej(e.message)
        }
        await browser.close()
    });
}