const dataListElement = document.getElementById("dataList");
const buttonElement = document.getElementById("btnCreate");

fillData = async () => {
    const response = await fetch("/data");
    const jsondata = await response.json();
    console.log(jsondata);

    displayResults(jsondata.dataToReturn);
};

buttonElement.onclick = async () => {
    const dataToSend = {
        dataToAdd: "New data"
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

displayResults = (dataToDisplay) => {
    dataListElement.replaceChildren();
    for(d of dataToDisplay) {
        const liElement = document.createElement("li");
        liElement.textContent = d;
        dataListElement.appendChild(liElement);
    }
}