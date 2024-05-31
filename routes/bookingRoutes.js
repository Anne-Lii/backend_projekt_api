/*Anne-Lii Hansen */
"use strict"

//include modules
const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings"); // Import Booking model

// Route to create a new booking
router.post("/", async (req, res) => {
    try {
        const newBooking = new Booking(req.body);// Create a new Booking instance with data from req body
        const savedBooking = await newBooking.save();// Save the new booking to the database
        res.status(201).json(savedBooking); // Return the saved booking as JSON response
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all bookings
router.get("/", async (req, res) => {
    console.log("GET /api/bookings called");
    try {
        const bookings = await Booking.find(); // Find all bookings in the database
        res.json(bookings);// Return all bookings as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a single booking by ID
router.get("/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);// Find booking by ID
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.json(booking);// Return booking as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to update a booking by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Find and update booking by ID
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.json(updatedBooking);// Return updated booking as JSON response
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete a booking by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.json({ message: "Booking deleted" }); // Return success message if booking deleted
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; // Export router for use in other files
