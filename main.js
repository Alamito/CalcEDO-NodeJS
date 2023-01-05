const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('https://mathdf.com/dif/pt/');
    

    // seleciona o campo de inserir equacao
    await page.click('#input-expression');

    // escreve a equacao e "pressiona" enter (\n)
    await page.type('#input-expression', `y'' + 1/xy'=2xy'\n`);

    await page.screenshot({ path: "./screenshot/example.png" });
    await browser.close();
})();