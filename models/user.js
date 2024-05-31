/*Anne-Lii Hansen */
"use strict"

// Import required modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema for users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
    try {
        if (this.isNew || this.isModified("password")) { // Hash password only if it's new or modified
            const hashedPassword = await bcrypt.hash(this.password, 10); // Hash password
            this.password = hashedPassword;// Set hashed password
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Register a new user
userSchema.statics.register = async function (username, password) {
    try {
        const user = new this({username, password});
        await user.save(); // Save user to database
        return user;// Return registered user

    } catch(error) {
        throw error;
    }
};

//compare hashed password
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);   
    } catch (error) {
        throw error;
    }
}

// Login a user
userSchema.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({username});// Find user by username
        if(!user) {
            throw new Error("Fel användarnamn eller lösenord");
        }

        const isPasswordMatch = await user.comparePassword(password); // Compare passwords

        // Incorrect password
        if(!isPasswordMatch) {
            throw new Error("Fel användarnamn eller lösenord");
        }

         // Correct username and password
        return user;

    } catch (error) {
        throw error;
    }
}
const user = mongoose.model("user", userSchema); // Create the user model using the schema
module.exports = user; // Export the user model for use in other files