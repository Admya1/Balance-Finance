const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const app = express()
const transactionsRoute = require('./routes/transactions.js');
require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

//route
app.use('/api/v1',transactionsRoute);

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()