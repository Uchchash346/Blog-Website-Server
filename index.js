const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4sdse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('carMechanic');
        const newCollection = database.collection('myFirstBlog');

        // GET API
        app.get('/myFirstBlog', async (req, res) => {
            const cursor = newCollection.find({});
            const blogs = await cursor.toArray();
            res.send(blogs);
        })

        // POST API
        app.post('/myFirstBlog', async (req, res) => {
            const blogService = req.body;
            console.log("Hitting blog api", blogService);
            const result = await newCollection.insertOne(blogService);
            console.log(result);
            res.json(result);
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Running the server successfully");
})

app.listen(port, () => {
    console.log("Running server on PORT", port);
});