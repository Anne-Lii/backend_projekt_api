//Routes for auth

const express = require("express");//include express
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
console.log("Du är ansluten till MongoDB");
}).catch((error) => {
    console.error("Serverfel när koppling till databasen gjordes", error);
});

//User interface
const User = require("../models/user")


//Add new user
router.post("/register", async (req, res) => {
    try {
     const {username, password} = req.body;
 
     //validate input
     if (!username || !password) {
         return res.status(400).json({ error: " Skriv in användarnamn och lösenord"});
     }
 
     //correct - save user
     const user = new User({ username, password});
     await user.save();
     res.status(201).json({ message: " Användare skapad"});
 
    } catch (error) {
     res.status(500).json({error: " serverfel" + error});
    }
});

//Login admin
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Does user exist?
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Fel användare eller lösenord" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Fel användare eller lösenord" });
        } else {

        // Create JWT
        const payload = { id: user._id, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ message: "Du har blivit inloggad", token });
        }

      
    } catch (error) {
        res.status(500).json({ error: "Serverfel" });
    }
});



module.exports = router;

