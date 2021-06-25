const http = require('http');
const express = require('express');
const mongoose = require('mongoose')

const cors = require('cors')

const { MONGOURI } = require('./config/keys')

const app = express()
const router = express.Router()

// const MongoClient = require('mongodb').MongoClient;
// const uri = MONGOURI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log('connected to mongoose')
//   console.log('----',err)
//   // perform actions on the collection object
// });

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('connected to mongoose')
})

mongoose.connection.on('error', (err) => {
    console.log('not connected: ', err)
})

require('./models/PeopleSchema')

app.listen(5000, () => {
    console.log("server is running on ", 5000)
})

app.use(express.json())
app.use(require('./routes/Person'))

console.log('Server running at http://127.0.0.1:5000/');