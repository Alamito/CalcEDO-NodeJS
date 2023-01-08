const puppeteer = require('puppeteer');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const serverURL = "http://127.0.0.1:8080/api";

console.log("Back End in execution mode");

const getEquation = (serverURL) => {
    const promiseCallback = (resolve) => {
        return resolve(axios.get(serverURL));
    }

    return new Promise(promiseCallback);
}

const doScreenshotResult = async (equation) => {
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

    // faz screenshot de result
    const idScreenshot = uuidv4();
    await result.screenshot({ path: `./screenshot/${idScreenshot}.png`});
    
    // fecha o chrome
    await browser.close();

    return idScreenshot;
};

const updateStatusAPI = (serverURL, idScreenshot) => {
    axios.put(`${serverURL}/1`, {
        equation: '',
        status: "!used",
        idScreenshot: idScreenshot,
    })
}

function tarefas(serverURL) {
    getEquation(serverURL)
        .then(response => {
            let equation = response.data.equations.data[0].equation;
            return equation;
        })
        .then(equation => {
            return doScreenshotResult(equation);
        })
        .then((idScreenshot) => {
            updateStatusAPI(serverURL, idScreenshot);
            stopCheckApi = false;
            console.log('chegou aqui?')
        });
}


let stopCheckApi = false;
const checkStatusAPI = setInterval(() => {
    if (stopCheckApi === false) {
        console.log('Verificando status da API');
        axios.get(serverURL)
            .then(response => {
                const status = response.data.equations.data[0].status;
                if (status === 'in transit') { 
                    stopCheckApi = true;
                    console.log('Verificacao interrompida...');
                    console.log(serverURL)
                    tarefas(serverURL);
                }
        })
    }
    
}, 1000);


