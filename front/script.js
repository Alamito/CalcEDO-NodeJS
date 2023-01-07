const serverURL = "http://127.0.0.1:8080/api";
const inputEquation = document.querySelector('#boxEquation');

const sendEquation = () => { 
    const equation = inputEquation.value

    axios.put(`${serverURL}/1`, {
        equation: equation
    });
}


// document.addEventListener('click', (event) => console.log(event))
