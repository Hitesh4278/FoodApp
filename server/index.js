const express = require('express')
const app = express();
const PORT = 8000;

const Connection = require('./database/db')

Connection();

app.get('/', (req, res) => {
    res.send("Hello")
})

app.use(express.json())
app.use('/api', require("./Routes/CreateUser"))

app.listen(PORT, () => {
    console.log(`Server Started on ${PORT} `)
})
