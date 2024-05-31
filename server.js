/*Anne-Lii Hansen*/
"use strict"

//Include modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config(); // Load environment variables from .env file

// Include routes
const authlogRoutes = require("./routes/authlogRoutes"); // Include routes
const foodRoutes = require("./routes/foodRoutes");
const drinkRoutes = require("./routes/drinkRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const port = process.env.PORT || 3000;
const app = express(); // Create an instance of Express application

app.use(bodyParser.json()); // Parse JSON bodies of incoming requests
app.use(cors({ origin: "*" })); // Enable CORS for all origins

// Routes
app.use("/api", authlogRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/drinks", drinkRoutes);
app.use("/api/bookings",bookingRoutes);

// Combined route for adding new items (food or drink)
app.post("/api/items/:type", authenticateToken, (req, res) => {
    const newItem = req.body;
    const itemType = req.params.type; // Extract the type parameter from the URL

    // Check if the type is valid (food or drink)
    if (itemType !== 'food' && itemType !== 'drink') {
        return res.status(400).json({ message: "Invalid item type" });
    }

    // Respond with the created item
    res.status(201).json(newItem);
});

// Protected route for admin
app.get("/api/admin", authenticateToken, (req, res) => {
    res.json({ message: "Du är inloggad som Administratör" });
});

// Token validation middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]; // Get the Authorization header
    const token = authHeader && authHeader.split(" ")[1];// Extract the token from the header

    if (token == null)
        return res.status(401).json({ message: "Du har inte tillgång till denna sida - Token saknas!" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => { // Verify the token
        if (error) return res.status(403).json({ message: "Ogiltig JWT!" });
        req.user = user;// Attach user information to request object
        next();
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Server startad på port: ${port}`);
});
