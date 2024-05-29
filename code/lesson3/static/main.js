// get all the elements from the page
const value1Element = document.getElementById('value1');
const value2Element = document.getElementById('value2');
const buttonElement = document.getElementById('btnAdd');
const outputElement = document.getElementById('result');

// buttonElement.addEventListener("click", () => {...});
buttonElement.onclick = async () => {
    const dataToSend = {
        operand1: value1Element.value,
        operand2: value2Element.value
    };
    // waiting for the result from the server
    const result = await fetch('/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
    });
    // convert it to a json object
    const jsonResultData = await result.json();
    console.log(jsonResultData);

    outputElement.textContent = `The result is ${jsonResultData.result}`;
};