const mongoose = require('mongoose');
const URL = `mongodb+srv://hitesh:12345@foodapp.jipqsyv.mongodb.net/MyFood?retryWrites=true&w=majority`;

const Connection = async () => {
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Connected To Database Successfully");

        const data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = data;

        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.foodCategory = foodCategory;

        return data;
    }
    catch (error) {
        console.log("Error While Connecting to Database", error.message);
    }
};

module.exports = Connection;
