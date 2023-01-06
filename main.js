const puppeteer = require('puppeteer');

const equation = `xy'-y = 5x^2*cos(3x)+x`;

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    // vai ate o site da calculadora de EDO
    await page.goto('https://mathdf.com/dif/pt/');
    
    // seleciona o campo de inserir equacao
    await page.click('#input-expression');

    // escreve a equacao e "pressiona" enter (\n)
    await page.type('#input-expression', `${equation}\n`);

    // espera calcular e desenhar a equacao
    await page.waitForSelector('[class = "load-container hide"]');

    // result recebe o seletor da div onde fica o resultado da EDO
    const result = await page.$('#math-canvas > div > div:nth-child(2) > div');
    const onlyEquationResult = await page.$('#math-canvas > div > div:nth-child(2) > div > div:nth-child(8)');

    // faz screenshot de result
    await result.screenshot({ path: "./screenshot/result.png"});
    
    // faz screenshot somente do resultado da EDO
    await onlyEquationResult.screenshot({path: "./screenshot/onlyResultEquation.png"});

    // fecha o chrome
    await browser.close();

})();