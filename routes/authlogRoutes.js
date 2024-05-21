//Routes for auth

const express = require("express");//include express
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
console.log("Du är ansluten till MongoDB");
}).catch((error) => {
    res.status(500).json({error: " serverfel när koppling till databasen gjordes"});
});

//Login admin
router.post("/login", async (req, res) => {
    try {
        const {username, password } = req.body;

        //validate user and password
        if(username ===`admin` && password ===`admin`) {

            //create JWT
            const payload = {username: username};
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn:"1h"});
            const response =  {
                message: "Du har blivit inloggad",
                token:token
            }
            
            res.status(200).json({response});
        } else {
            res.status(401).json({message: `Fel användare eller lösenord`});
        }

    } catch (error) {
        res.status(500).json({error: " serverfel"});
    }
});

module.exports = router;