const mongoose = require('mongoose');
const URL = `mongodb+srv://hitesh:12345@foodapp.jipqsyv.mongodb.net/MyFood?retryWrites=true&w=majority`;

const Connection = async () => {
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Connected To Database Successfully");

        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        // console.log("Fetched Data: ", fetchedData);
        
        // Return the fetched data or pass it to a callback
        return fetchedData;
    }
    catch (error) {
        console.log("Error While Connecting to Database", error.message);
        // Handle the error appropriately
    }
};

module.exports = Connection;
