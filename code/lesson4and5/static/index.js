const dataListElement = document.getElementById("dataList");
const createButtonElement = document.getElementById("btnCreate");
const newItemTextElement = document.getElementById("newItemText");
const deleteButtonElement = document.getElementById("btnDelete");
const numberToDeleteElement = document.getElementById("numberToDelete");

const updateTextElement = document.getElementById("updatedText");
const updateIndexElement = document.getElementById("numberToUpdate");
const updateButtonElement = document.getElementById("btnUpdate");

fillData = async () => {
    const response = await fetch("/data");
    // convert it to a json object
    const jsondata = await response.json();
    console.log(jsondata);

    displayResults(jsondata.dataToReturn);
};

createButtonElement.onclick = async () => {
    const dataToSend = {
        dataToAdd: newItemTextElement.value
    };
    // waiting for the result from the server
    const result = await fetch('/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
    });
    // convert it to a json object
    const jsondata = await result.json();

    displayResults(jsondata.dataToReturn);
};

deleteButtonElement.onclick = async () => {
    const itemToDelete = numberToDeleteElement.value; // "2"
    const result = await fetch(`/data/${itemToDelete}`, { // /data/2
        method: 'DELETE'
    });
    // convert it to a json object
    const jsondata = await result.json();

    displayResults(jsondata.dataToReturn);
}

updateButtonElement.onclick = async () => {
    const textToUpdate = updateTextElement.value;
    const indexToUpdate = updateIndexElement.value;

    const dataToSend = {
        dataToUpdate: textToUpdate
    };
    // waiting for the result from the server
    const result = await fetch(`/data/${indexToUpdate}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
    });
    // convert it to a json object
    const jsondata = await result.json();

    displayResults(jsondata.dataToReturn);
};
displayResults = (dataToDisplay) => {
    dataListElement.replaceChildren();
    for(d of dataToDisplay) {
        const liElement = document.createElement("li");
        liElement.textContent = d;
        dataListElement.appendChild(liElement);
    }
}