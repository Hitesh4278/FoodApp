const express = require('express')
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51MsipeSEMRCrNiynWlhTaIvC5vTR1EblR1BLH5Txhdas4A2vb1lSf4FGnQsmfCpIeAbya8CJy7gJznICmeFKRTPv00mZoTcrNZ");
const PORT = 8000;


const Connection = require('./database/db')

Connection();

app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
  res.send("Hello")
})

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  )
  next()
})
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/OrderData"))
app.use('/api',require("./Routes/Payment"))

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT} `)
});
