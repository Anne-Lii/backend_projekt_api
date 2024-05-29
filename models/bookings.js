const mongoose = require("mongoose");

// Bookings
const bookingInterface = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true        
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model("Booking", bookingInterface);
module.exports = Booking;
