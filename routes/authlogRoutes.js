/*Anne-Lii Hansen */
"use strict"


// Including modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Connect to MongoDB database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
console.log("Du är ansluten till MongoDB");
}).catch((error) => {
    console.error("Serverfel när koppling till databasen gjordes", error);
});

// Import User model
const User = require("../models/user")

// Route to register a new user
router.post("/register", async (req, res) => {
    try {
     const {username, password} = req.body;
 
     //validate input
     if (!username || !password) {
         return res.status(400).json({ error: " Skriv in användarnamn och lösenord"});
     }
 
     //correct - save user
     const user = new User({ username, password}); // Create a new instance of the User model
     await user.save(); // Save the user to the database
     res.status(201).json({ message: " Användare skapad"});
 
    } catch (error) {
     res.status(500).json({error: " serverfel" + error});
    }
});

// Route to login admin
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Fel användare eller lösenord" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
        if (!isMatch) {
            return res.status(401).json({ message: "Fel användare eller lösenord" });
        } else {

        // Create JWT token
        const payload = { id: user._id, username: user.username }; // Define payload for JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" }); // Generate JWT token with expiration
        res.status(200).json({ message: "Du har blivit inloggad", token });
        }
      
    } catch (error) {
        res.status(500).json({ error: "Serverfel" });
    }
});

module.exports = router;// Export router for use in other files

