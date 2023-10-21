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
    const collection4 = client.db('data_sensor').collection('temperatura_solo');
    const collection5 = client.db('data_sensor').collection('umidade_ar');
    const collection6 = client.db('data_sensor').collection('umidade_solo');
    const collection7 = client.db('data_sensor').collection('vento_direção');
    const collection8 = client.db('data_sensor').collection('vento_velocidade');
    const collection9 = client.db('data_sensor').collection('heigth');
    // Consulta para recuperar dados do MongoDB
    const data1 = await collection1.find({}).toArray();
    const data2 = await collection2.find({}).toArray();
    const data3 = await collection3.find({}).toArray();
    const data4 = await collection4.find({}).toArray();
    const data5 = await collection5.find({}).toArray();
    const data6 = await collection6.find({}).toArray();
    const data7 = await collection7.find({}).toArray();
    const data8 = await collection8.find({}).toArray();
    const data9 = await collection9.find({}).toArray();


    // Feche a conexão com o MongoDB
    await client.close();

    const labels1 = data1.map(item => item.date);
    const values1 = data1.map(item => item.data);
    const labels2 = data2.map(item => item.date);
    const values2 = data2.map(item => item.data);
    const labels3 = data3.map(item => item.date);
    const values3 = data3.map(item => item.data);
    const labels4 = data4.map(item => item.date);
    const values4 = data4.map(item => item.data);
    const labels5 = data5.map(item => item.date);
    const values5 = data5.map(item => item.data);
    const labels6 = data6.map(item => item.date);
    const values6 = data6.map(item => item.data);
    const labels7 = data7.map(item => item.date);
    const values7 = data7.map(item => item.data);
    const labels8 = data8.map(item => item.date);
    const values8 = data8.map(item => item.data);
    const labels9 = data9.map(item => item.date);
    const values9 = data9.map(item => item.data);
    


    // Responda com os dados em formato JSON
    res.json({ labels1,values1, labels2,values2, labels3,values3, labels4,values4, labels5,values5, labels6,values6, labels7,values7, labels8,values8, labels9, values9});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados no MongoDB' });
  }
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})
