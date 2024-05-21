//Routes for auth

const express = require("express");//include express
const router = express.Router();


//Login admin
router.post("/login", async (req, res) => {
    try {
        const {username, password } = req.body;

        //validate user and password
        if(username ===`admin` && password ===`admin`) {
            res.status(200).json({message: `Lyckad inloggning`, token: `här ska token placeras`});
        } else {
            res.status(401).json({message: `Fel användare eller lösenord`});
        }

    } catch (error) {
        res.status(500).json({error: " serverfel"});
    }
});

module.exports = router;