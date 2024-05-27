const express = require("express");
const server = express();
const PORT = 3000;

server.use(express.static("static"));
server.use(express.urlencoded({extended: true})); // important if using POST requests

server.post("/processform", (req, res) => {
    console.log(req.body);
    // get the data from the body
    const textfield = req.body.textfield;
    // take the next line as given
    const reversed = textfield.split("").reverse().join("");
    // send some response
    res.send(`Text reversed: ${reversed}`);
});

server.listen(PORT);