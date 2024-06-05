// use the mysql packge
const mysql = require("mysql");
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'hcs_2024_1',
    connectionLimit: 10
});

const express = require("express");
const server = express();
const PORT = 3000;

server.use(express.static("static"));
server.use(express.json());

server.get("/data", (req, res) => {
    pool.query("SELECT * FROM rawdata", 
        (error, results, fields) => {
            if (error) {
                console.error("Error when querying data from MySQL", error);
                res.status(500).send(error);
            } else {
                // implicitely sets status code to 200
                res.send(results);
            }
        }
    );
});

server.post("/data", (req, res) => {
    pool.query("INSERT INTO rawdata SET ?",
        { data: req.body.dataToAdd }, // data is the column name inside the rawdata table
        (error, results, fields) => {
            // we have the data inserted, now return all the data
            pool.query("SELECT * FROM rawdata", 
                (error, results, fields) => {
                    res.send(results);
                }
            );
        }
    );
})

server.listen(PORT, () => {
    console.log(`Server has been started. Please go to http://localhost:${PORT} to run`);
});
