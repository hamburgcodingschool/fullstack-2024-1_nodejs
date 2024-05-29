const express = require("express");
const server = express();
const PORT = 3000;

server.use(express.static("static")); // serve static content from the "static" directory
server.use(express.json()); // tells server that we are expecting json data to handle

// server endpoint to do some basic calculation
server.post('/calculate', (req, res) => {
    console.log(req.body);

    const op1 = parseFloat(req.body.operand1);
    const op2 = parseFloat(req.body.operand2);

    // calculate the result
    const result = op1 + op2;

    // send result back to client
    res.send({ result: result });
});

// start the server
server.listen(PORT, () => {
    console.log(`Your server is up and running. Plese go to http://localhost:${PORT}/ to start the app.`);
});
