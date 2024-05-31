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

server.listen(PORT);