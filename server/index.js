

const express=require('express')
const Connection=require('./database/db')
// dotenv.config();
const app = express();
const PORT = 8000;

Connection();


app.listen(PORT, () => {
    console.log(`Server Started on ${PORT} `)
})

