const mongoose = require("mongoose");


//Drink schema
const drinkSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    drinkname: {
        type: String,
        required: true,
        unique: true        
    },
    description: {
        type: String        
    },
    price: {
        type: Number
        
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Drink = mongoose.model("drinks", drinkSchema)
module.exports = Drink;