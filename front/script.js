const serverURL = "http://127.0.0.1:8080/api";
const inputEquation = document.querySelector('#boxEquation');
const imgResult = document.querySelector('#imgResult');

const sendEquation = () => { 
    const equation = inputEquation.value;

    axios.put(`${serverURL}/1`, {
        equation: equation,
        status: 'in transit',
    });

    imgResult.src = "../img/loading.gif";
}

const searchFlagAPI = (serverURL) => {
    axios.get(serverURL)
        .then((response) => {
            console.log('Verificando status da API');
            const status = response.data.equations.data[0].status;
            if (status === "!used") {
                const idScreenshot = response.data.equations.data[0].idScreenshot;
                imgResult.src = `../screenshot/${idScreenshot}.png`;
                updateStatusAPI(serverURL);
            }
        })
}

const updateStatusAPI = (serverURL) => {
    axios.put(`${serverURL}/1`, {
        equation: '',
        status: 'used',
    })
}

setInterval(() => {
    searchFlagAPI(serverURL);
}, 1000);


// document.addEventListener('click', (event) => console.log(event))
