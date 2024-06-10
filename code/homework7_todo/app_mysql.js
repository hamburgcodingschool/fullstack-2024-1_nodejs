// use the mysql packge
const mysql = require("mysql");
require('dotenv').config();
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'hcs_2024_1',
    connectionLimit: 10
});

/* Create table using:
 CREATE TABLE todo (
  id BIGINT auto_increment not null,
  entrytext TEXT not null,
  PRIMARY KEY(id)
);
*/

const express = require("express");
const server = express();
const PORT = 3000;

server.use(express.static("static"));
server.use(express.json());

server.get("/todo", (req, res) => {
    displayResults(res);
});

server.post("/todo", (req, res) => {
    pool.query("INSERT INTO todo SET ?",
        { entrytext: req.body.dataToAdd }, // data is the column name inside the rawdata table
        (error, results, fields) => {
            if (error) {
                console.error("Error when querying data from MySQL", error);
                res.status(500).send(error);
            } else {
                displayResults(res);
            }
        }
    );
});

server.delete("/todo", async (req, res) => {
    pool.query("DELETE FROM todo WHERE id=?",
        req.query.id,
        (error, results, fields) => {
            if (error) {
                console.error("Error when querying data from MySQL", error);
                res.status(500).send(error);
            } else {
                displayResults(res);
            }
        }
    );
});



server.put("/todo", async (req, res) => {
    pool.query("UPDATE todo SET ? WHERE id=?",
        [{entrytext: req.body.dataToUpdate}, req.query.id],
        (error, results, fields) => {
            if (error) {
                console.error("Error when querying data from MySQL", error);
                res.status(500).send(error);
            } else {
                displayResults(res);
            }
        }
    );
});

const displayResults = (res) => {
    pool.query("SELECT * FROM todo", 
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
}

server.listen(PORT, () => {
    console.log(`Server has been started. Please go to http://localhost:${PORT} to run`);
});
