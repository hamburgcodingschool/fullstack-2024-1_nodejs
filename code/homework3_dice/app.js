const express = require("express");
const server = express();
const PORT = 3000;

server.use(express.static("static")); // serve static content from the "static" directory
server.use(express.json()); // important if using json requests

server.post("/rolldice", (req, res) => {
    // get the data from the body and convert them to a number (integer)
    const number_of_sides = parseInt(req.body.number_of_sides);

    if (isNaN(number_of_sides)) {
        res.status(500).send({ error: "Not a valid number"});
    } else {
        // do the work
        const rolled = Math.floor(Math.random() * number_of_sides) + 1;

        // send result
        res.send({ rolled: rolled }); 
    }
});

server.listen(PORT, () => {
    console.log(`Your server is up and running. Plese go to http://localhost:${PORT}/ to start the dice roller.`);
});