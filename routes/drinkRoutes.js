/*Anne-Lii Hansen */
"use strict"


//include modules
const express = require("express");
const router = express.Router();
const Drink = require("../models/drinks"); // Import Drink model

// Route to create a new drink item
router.post("/", async (req, res) => {
    try {
        const newDrink = new Drink(req.body);
        const savedDrink = await newDrink.save();
        res.status(201).json(savedDrink);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all drink items
router.get("/", async (req, res) => {
    try {
        const drinks = await Drink.find();
        res.json(drinks);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a single drink item by ID
router.get("/:id", async (req, res) => {
    try {
        const drink = await Drink.findById(req.params.id);
        if (!drink) {
            return res.status(404).json({ message: "Drycken finns ej" });
        }
        res.json(drink);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to update a drink item by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedDrink = await Drink.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDrink) {
            return res.status(404).json({ message: "Drycken hittas ej" });
        }
        res.json(updatedDrink);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete a drink item by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedDrink = await Drink.findByIdAndDelete(req.params.id);
        if (!deletedDrink) {
            return res.status(404).json({ message: "Drycken hittas ej" });
        }
        res.json({ message: "Dryck raderad" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; // Export router for use in other files