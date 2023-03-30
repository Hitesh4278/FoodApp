
const mongoose = require('mongoose')

const URL = `mongodb+srv://hitesh:12345@foodapp.jipqsyv.mongodb.net/?retryWrites=true&w=majority`;
const Connection = async () => {
    try {

        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
        console.log("Connected To Database SuccessFully");
    }
    catch (error) {
        console.log("Error While Connecting to DataBase", error.message);
    }
}

module.exports = Connection;