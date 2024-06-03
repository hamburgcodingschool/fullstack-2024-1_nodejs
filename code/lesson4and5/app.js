const express = require("express");
const server = express();
const PORT = 3000;

server.use(express.static("static"));
server.use(express.json());

dataStorage = ['prefilled data1', 'prefilled data2'];

server.get("/data", (req, res) => {
    res.send({ dataToReturn: dataStorage });
});

server.post("/data", (req, res) => {
    const dataToAdd = req.body.dataToAdd;

    dataStorage.push(dataToAdd);

    res.send({ dataToReturn: dataStorage });
});

server.delete("/data/:id", (req, res) => {
    const indexToDelete = req.params.id;
    
    dataStorage = dataStorage.filter((_, i) => (i+1) != indexToDelete);

    res.send({ dataToReturn: dataStorage });
});

server.put("/data/:id", (req, res) => {
    // get the parameters
    const newData = req.body.dataToUpdate;
    const index = parseInt(req.params.id) - 1;

    /*dataStorage = dataStorage.map((oldData, i) => 
        (i == index) ? newData : oldData
    );*/

    // this is the same as the filter method:
    
    let newStorage = [];
    for(let i=0; i < dataStorage.length; i++) {
        if (i == index) {
            // "push" == add new element to the array
            newStorage.push(newData);
        } else {
            // "push" == add new element to the array
            newStorage.push(dataStorage[i]);
        }
    }
    dataStorage = newStorage;
    

    res.send({ dataToReturn: dataStorage });
});

server.listen(PORT);