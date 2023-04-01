const express = require('express')
const app = express();
const PORT = 8000;

const Connection = require('./database/db')

Connection();

app.get('/', (req, res) => {
    res.send("Hello")
})

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    )
    next()
})
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))

app.listen(PORT, () => {
    console.log(`Server Started on ${PORT} `)
})
