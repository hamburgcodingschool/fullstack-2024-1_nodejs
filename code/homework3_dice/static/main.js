const sidesElement = document.getElementById('sides');
const buttonElement = document.getElementById('btnRoll');
const outputElement = document.getElementById('resultarea');
const historyElement = document.getElementById('dice-history');
const validationElement = document.getElementById('sidesInvalid');
validationElement.style.display = 'none';

let rollnumber = 0;

buttonElement.onclick = async () => {
    // validate, if we actually have a number
    if (sidesElement.value == '' || isNaN(parseInt(sidesElement.value))) {
        validationElement.style.display = 'block';
    } else {
        validationElement.style.display = 'none';

        const dataToSend = {
            number_of_sides: sidesElement.value
        };
        // waiting for the result from the server
        const result = await fetch('/rolldice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });
        if (result.status == 200) {
            // convert it to a json object
            const jsonResultData = await result.json();
            console.log(jsonResultData);
            rollnumber += 1;

            const divElement = document.createElement("div");
            divElement.id = "number"
            divElement.textContent = jsonResultData.rolled;
            divElement.classList.add("spin");
            outputElement.replaceChildren(divElement);

            const diceHistory = document.createElement("li");
            diceHistory.textContent = `Roll ${rollnumber}: ${jsonResultData.rolled}`
            
            setTimeout(() => {
                divElement.classList.remove("spin");
                historyElement.append(diceHistory);
            }, 2000);
        } else {
            validationElement.style.display = 'block';
        }
    }
};
