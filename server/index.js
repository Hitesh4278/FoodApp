// Import necessary modules
const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const Connection = require('./database/db');
Connection();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello");
});

app.use('/api', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
