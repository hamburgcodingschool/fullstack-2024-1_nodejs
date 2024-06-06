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

    if (response.status == 200) {
        // convert it to a json object
        const jsondata = await response.json();
        console.log(jsondata);

        displayResults(jsondata);
    } else {
        const jsondata = await response.json();
        alert(jsondata.sqlMessage);
    }
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

    displayResults(jsondata);
};

deleteButtonElement.onclick = async () => {
    const indexToDelete = parseInt(numberToDeleteElement.value); // "2"
    const itemToDelete = dataListElement.children[indexToDelete-1].getAttribute("data-id");
    
    const result = await fetch(`/data?id=${itemToDelete}`, { // /data/6661ef2ff42aa892b21e2137
        method: 'DELETE'
    });
    // convert it to a json object
    const jsondata = await result.json();

    displayResults(jsondata);
}

updateButtonElement.onclick = async () => {
    const textToUpdate = updateTextElement.value;
    const indexToUpdate = parseInt(updateIndexElement.value); // "2"
    const itemToUpdate = dataListElement.children[indexToUpdate-1].getAttribute("data-id");

    const dataToSend = {
        dataToUpdate: textToUpdate
    };
    // waiting for the result from the server
    const result = await fetch(`/data?id=${itemToUpdate}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
    });
    // convert it to a json object
    const jsondata = await result.json();

    displayResults(jsondata);
};

displayResults = (dataToDisplay) => {
    dataListElement.replaceChildren();
    for(d of dataToDisplay) {
        const liElement = document.createElement("li");
        liElement.setAttribute("data-id", d._id);
        liElement.textContent = d.data;
        dataListElement.appendChild(liElement);
    }
}