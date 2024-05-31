/*Anne-Lii Hansen */
"use strict"

const mongoose = require("mongoose"); // Require Mongoose module

// Define the schema for food
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

const food = mongoose.model("food", foodSchema); // Create the food model using the schema
module.exports = food; // Export the Food model for use in other files