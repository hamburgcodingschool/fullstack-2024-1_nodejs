require('dotenv').config();

const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URL);
const database = client.db("HCS1");
const collection = database.collection("todo"); // basically a table

const express = require("express");
const server = express();

server.use(express.static("static"));
server.use(express.json());

server.get("/todo", async (req, res) => {
    await sendDataToClient(res);
});
server.post("/todo", async (req, res) => {
    // creating the document to insert
    const doc = {
        entrytext: req.body.dataToAdd
    }
    // actually inserting the document into our collection
    await collection.insertOne(doc);
    // get all the data we have store so far and send them to the client
    await sendDataToClient(res);
});
server.delete("/todo", async (req, res) => {
    const query = { _id: new ObjectId(req.query.id)}
    const result = await collection.deleteOne(query);

    if (result.deletedCount == 0) {
        console.log(result);
        res.status(500).send(result);
    } else {
        await sendDataToClient(res);
    }
});
server.put("/todo", async (req, res) => {
    const query = { _id: new ObjectId(req.query.id)}
    const updateDoc = {
        $set: {
            entrytext: req.body.dataToUpdate
        }
    }
    await collection.updateOne(query, updateDoc, { upsert: true });

    await sendDataToClient(res);
});

const sendDataToClient = async (res) => {
    const data = await collection.find({}).toArray();

    res.send(data);
};

server.listen(process.env.PORT, () => {
    console.log("Server has been started. Please go to " +
        `http://localhost:${process.env.PORT} to run`);
});

