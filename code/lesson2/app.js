const express = require("express");
const server = express();
const PORT = 3000;

server.use(express.static("static")); // serve static content from the "static" directory
server.use(express.urlencoded({extended: true})); // important if using POST requests

// in real world, you would create a random session id
const session_id = 1234; // just to simplify, we make it constant here, in real world it would be stored in a cookie
let GLOBAL_RESULT = [];
GLOBAL_RESULT[session_id] = 0;

server.post("/processform", (req, res) => {
    console.log(req.body); // see the form parameters in the console

    // get the data from the body and convert them to a number (integer)
    const op1 = parseInt(req.body.op1);
    const op2 = parseInt(req.body.op2);

    // add the operands
    GLOBAL_RESULT[session_id] = op1 + op2;

    // here you would store the data to the database

    res.redirect("/resultpage"); // redirect after post pattern
});

server.get("/resultpage", (req, res) => {
    // actually you would first read the data from the database
    
    // print the result
    res.send(`Result: ${GLOBAL_RESULT[session_id]}`);
});

server.listen(PORT);