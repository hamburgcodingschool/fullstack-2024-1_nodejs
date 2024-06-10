const dataListElement = document.getElementById("dataList");
const createButtonElement = document.getElementById("btnCreate");
const newItemTextElement = document.getElementById("newItemText");
const deleteButtonElement = document.getElementById("btnDelete");
const numberToDeleteElement = document.getElementById("numberToDelete");

const updateTextElement = document.getElementById("updatedText");
const updateIndexElement = document.getElementById("numberToUpdate");
const updateButtonElement = document.getElementById("btnUpdate");

fillData = async () => {
    const response = await fetch("/todo");

    displayResults(response);
};

createButtonElement.onclick = async () => {
    const newToDo = prompt("Enter new todo:");
    if (newToDo !== "") {
        const dataToSend = {
            dataToAdd: newToDo
        };
        // waiting for the result from the server
        const result = await fetch('/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });
        displayResults(result);
    } else {
        fillData();
    }
};

displayResults = async (response) => {
    if (response.status == 200) {
        // convert it to a json object
        const dataToDisplay = await response.json();
    
        dataListElement.replaceChildren();
        for(var d of dataToDisplay) {
            const listItem = document.createElement("li");
            const spanElement = document.createElement("span");
            spanElement.setAttribute("data-id", d._id);
            spanElement.innerHTML = d.entrytext;
            spanElement.addEventListener("click", (event) => {
                event.target.className += " strike";
                setTimeout(() => {
                    fetch(`/todo?id=${event.target.getAttribute("data-id")}`, {
                        method: "DELETE"
                        }).then((data) => displayResults(data));
                }, 2000);
            });
            const buttonElement = document.createElement("button");
            buttonElement.innerHTML = "✎";
            buttonElement.setAttribute("data-id", d._id);
            buttonElement.setAttribute("data-original", d.entrytext);
            buttonElement.addEventListener("click", (event) => {
                const oldText = event.target.getAttribute("data-original");
                const newText = prompt("Edit ToDo text", oldText);
                if (newText !== null && newText !== "" && newText !== oldText) {
                    const dataToSend = {dataToUpdate: newText};
                    fetch(`/todo?id=${event.target.getAttribute("data-id")}`, {
                        method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(dataToSend)
                        }).then((data) => displayResults(data));
                } else {
                    fillData();
                }
            });
            listItem.append(spanElement);
            listItem.append(buttonElement);
            dataListElement.append(listItem);
        }
    } else {
        const jsondata = await response.json();
        alert(jsondata.sqlMessage);
    }
}