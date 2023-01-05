const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://mathdf.com/dif/pt/');
    await page.screenshot({ path: "./screenshot/example.png" });

    await browser.close();
})();