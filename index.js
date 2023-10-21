const express = require('express')

const app = express()

require('dotenv').config()

const cors = require('cors');
app.use(express.json())

const connectDB = require('./connectMongo')
const { MongoClient } = require('mongodb');
app.use(cors());
connectDB()

app.get('/getData', async (req, res) => {
  try {
    const client = new MongoClient(process.env.MONGODB_CONNECT_URI);
    await client.connect();
    // Acesse a coleção desejada
    const collection1 = client.db('data_sensor').collection('luz_ambiente');
    const collection2 = client.db('data_sensor').collection('pressao');
    const collection3 = client.db('data_sensor').collection('temperatura_ar');
  
    // Consulta para recuperar dados do MongoDB
    const data1 = await collection1.find({}).toArray();
    const data2 = await collection2.find({}).toArray();
    const data3 = await collection3.find({}).toArray();
    
    // Feche a conexão com o MongoDB
    await client.close();

    const labels1 = data1.map(item => item.date);
    const values1 = data1.map(item => item.data);
    const labels2 = data2.map(item => item.date);
    const values2 = data2.map(item => item.data);
    const labels3 = data3.map(item => item.date);
    const values3 = data3.map(item => item.data);
   


    // Responda com os dados em formato JSON
    res.json({ labels1,values1, labels2,values2, labels3,values3});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados no MongoDB' });
  }
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})
