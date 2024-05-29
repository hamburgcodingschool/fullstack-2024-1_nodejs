const express = require("express");
const session = require('express-session');
const server = express();
const PORT = 3000;

server.use(express.static("static")); // serve static content from the "static" directory
server.use(express.urlencoded({extended: true})); // important if using POST requests
// create a random session secret.
const SESSION_SECRET = new Array(64).fill().map(() => String.fromCharCode(Math.random()*86+40)).join("");
// use express sessions
server.use(session({
    // create a rando
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // we don't have SSL for testing
  }));

server.post("/calculatebmi", (req, res) => {
    // get the data from the body and convert them to a number (integer)
    const weight = parseFloat(req.body.weight);
    const height = parseInt(req.body.height);
    const gender = req.body.gender;

    // do the calculation
    const bmi = weight / height / height * 10000;

    let color = "green";
    if (gender == "male") {
        if (bmi < 18.5 || bmi >= 25) {
            color = "yellow";
        }
        if (bmi < 17 || bmi >= 30) {
            color = "red";
        }
    } else {
        // based on https://bmi-formula.com/women-bmi.php
        if (bmi < 17.5 || bmi >= 24) {
            color = "yellow";
        }
        if (bmi < 16 || bmi >= 29) {
            color = "red";
        }
    }

    // store the data in a session
    req.session.bmidata = {
        bmi: bmi,
        weight: weight,
        height: height,
        gender: gender,
        color: color
    }

    res.redirect("/resultpage"); // redirect after post pattern
});

server.get("/resultpage", (req, res) => {
    // check, if we have session data
    if (req.session.bmidata) {
        // set some variables for the view
        const bmi = Math.round(req.session.bmidata.bmi * 10) / 10;
        // translate the color to Bootstrap class names
        let color = "success";
        if (req.session.bmidata.color == "yellow") {
            color = "warning";
        }
        if (req.session.bmidata.color == "red") {
            color = "danger";
        }

        // print the result
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>BMI Calculator - Result</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body>
            <div class="container">
                <h1>Your BMI:</h1>
                <p>You entered:</p>
                <p>Weight: ${req.session.bmidata.weight} kg</p>
                <p>Height: ${req.session.bmidata.height} cm</p>
                <p>Gender: ${req.session.bmidata.gender}</p>
                <div class="p-3 text-${color}-emphasis bg-${color}-subtle border border-${color}-subtle rounded-3">
                    Your BMI is ${bmi} kg / m<sup>2</sup>
                </div>
                <br/>
                <a href="/" class="btn btn-primary">Restart calculation</a>
            </div>
        </body>
        </html>
        `);
    } else {
        // if we don't have session data, return to input screen
        res.redirect("/");
    }
});

server.listen(PORT, () => {
    console.log(`Your server is up and running. Plese go to http://localhost:${PORT}/ to start the BMI calculator.`);
});