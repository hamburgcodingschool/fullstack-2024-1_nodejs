const express = require("express");
const server = express();
const PORT = 3000;
const serverfunctions = require("./controllers/serverfunctions.js");

server.use(express.static("static"));
server.use(express.json());

server.get("/data", serverfunctions.getDataStorage);

server.post("/data", serverfunctions.addToDataStorage);

server.delete("/data/:id", serverfunctions.deleteFromDataStorage);

server.put("/data/:id", serverfunctions.updateDataInStorage);

server.listen(PORT);