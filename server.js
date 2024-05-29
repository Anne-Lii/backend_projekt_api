/*Anne-Lii Hansen*/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const authlogRoutes = require("./routes/authlogRoutes"); // Include route for auth and login
const foodRoutes = require("./routes/foodRoutes");
const drinkRoutes = require("./routes/drinkRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

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
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
        return res.status(401).json({ message: "Du har inte tillgång till denna sida - Token saknas!" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) return res.status(403).json({ message: "Ogiltig JWT!" });
        req.user = user;
        next();
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Server startad på port: ${port}`);
});
