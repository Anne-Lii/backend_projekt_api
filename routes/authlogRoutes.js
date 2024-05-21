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
    res.status(500).json({error: " serverfel när koppling till databasen gjordes"});
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







/*const express = require("express");//include express
const router = express.Router();
const Food = require("../models/food");

//create new food item
router.post("/", async (req, res) => {
    try {
        const newFood = new Food(req.body);
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Get all food items
router.get("/", async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single food item by ID
router.get("/:id", async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a food item by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.json(updatedFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a food item by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.id);
        if (!deletedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.json({ message: "Food item deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;*/