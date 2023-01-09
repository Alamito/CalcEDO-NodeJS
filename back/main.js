const puppeteer = require('puppeteer');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const serverURL = "http://127.0.0.1:8080/api";

console.log("Back End in execution mode");

const getEquation = (serverURL) => {
    console.log("Pegando equacao na API");
    const promiseCallback = (resolve) => {
        return resolve(axios.get(serverURL));
    }

    return new Promise(promiseCallback);
}

var idPreviousScreenshot = '';
var idNewScreenshot = '';

const doScreenshotResult = async (equation) => {
    console.log("Inicializando Puppeteer");

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    console.log("Viajando ate o site da calculadora");

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

    console.log("Tirando screenshot");

    // faz screenshot de result
    idPreviousScreenshot = idNewScreenshot;
    idNewScreenshot = uuidv4();
    await result.screenshot({ path: `./screenshot/${idNewScreenshot}.png`});
    
    // fecha o chrome
    await browser.close();

    return {new: idNewScreenshot, previous: idPreviousScreenshot};
};

const updateStatusAPI = (serverURL, idNewScreenshot) => {
    console.log("Atualizando API");
    axios.put(`${serverURL}/1`, {
        equation: '',
        status: "!used",
        idScreenshot: idNewScreenshot,
    })
}

const deletePreviousScreenshot = (idPreviousScreenshot, callback) => {
    fs.unlink(`./screenshot/${idPreviousScreenshot}.png`, callback);
}

function tasksForScreenshotResult(serverURL) {
    getEquation(serverURL)
        .then(response => {
            let equation = response.data.equations.data[0].equation;
            return equation;
        })
        .then(equation => {
            return doScreenshotResult(equation);
        })
        .then((Screenshots) => {
            updateStatusAPI(serverURL, Screenshots.new);
            stopCheckApi = false;
            return Screenshots;
        })
        .then((Screenshots) => {
            console.log(Screenshots.previous);
            if (Screenshots.previous != '')
                deletePreviousScreenshot(Screenshots.previous, function(error) {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('Successfully deleted previous screenshot');
                    }
                })
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
                    tasksForScreenshotResult(serverURL);
                }
        })
    }
    
}, 1000); 

