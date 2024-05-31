/*Anne-Lii Hansen */
"use strict"

const mongoose = require("mongoose"); // Require Mongoose module


// Define the schema for drinks
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

const Drink = mongoose.model("drinks", drinkSchema)// Create the Drink model using the schema
module.exports = Drink;// Export the Booking model for use in other files