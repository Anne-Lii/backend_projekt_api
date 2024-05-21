const mongoose = require("mongoose");


//Food schema
const foodSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    food: {
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

const food = mongoose.model("food", foodSchema)
module.exports = food;