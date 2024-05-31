/*Anne-Lii Hansen */
"use strict"

// Include modules
const express = require("express");
const router = express.Router();
const Food = require("../models/food");// Import Food model


// Route to create a new food item
router.post("/", async (req, res) => {
    try {
        const newFood = new Food(req.body);
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all food items
router.get("/", async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a single food item by ID
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

// Route to update a food item by ID
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

// Route to delete a food item by ID
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

module.exports = router; // Export router for use in other files