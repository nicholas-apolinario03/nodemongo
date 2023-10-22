const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(express.json());

const connectDB = require('./connectMongo');
const { MongoClient } = require('mongodb');
app.use(cors());
connectDB();

app.get('/getData', async (req, res) => {
  try {
    const client = new MongoClient(process.env.MONGODB_CONNECT_URI);
    await client.connect();
    const collections = [
      'luz_ambiente',
      'pressao',
      'temperatura_ar',
      'temperatura solo',
      'umidade_ar',
      'umidade_solo',
      'vento_direcao',
      'vento_velocidade',
      'height'
    ];

    const data = {};

    for (let i = 0; i < collections.length; i++) {
      const collection = client.db('data_sensor').collection(collections[i]);
      const dataItems = await collection.find({}).limit(20).toArray();
      data[`labels${i + 1}`] = dataItems.map(item => item.date);
      data[`values${i + 1}`] = dataItems.map(item => item.data);
    }

    // Feche a conexão com o MongoDB
    await client.close();

    // Responda com os dados em formato JSON
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados no MongoDB' });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
setInterval(() => {
  app.get('/getData', (req, res) => {
  });
}, 10000); 
