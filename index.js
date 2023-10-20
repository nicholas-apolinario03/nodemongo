const express = require('express')

const app = express()

require('dotenv').config()

app.use(express.json())

const connectDB = require('./connectMongo')
const { MongoClient } = require('mongodb');

connectDB()

app.get('/getData', async (req, res) => {
  try {
    const client = new MongoClient(process.env.MONGODB_CONNECT_URI, { useUnifiedTopology: true });
    await client.connect();
    const collection = client.db('ola').collection('slk');

    
    const data = await collection.find({}).toArray();

    
    await client.close();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados no MongoDB' });
  }
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})
