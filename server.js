/*Anne-Lii Hansen*/

const express = require("express"); //include express
const bodyParser = require("body-parser");
const cors = require("cors");//include cors
const authlogRoutes = require("./routes/authlogRoutes");//include route for auth and login
const jwt = require("jsonwebtoken");
const foodRoutes = require("./routes/foodRoutes");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors({origin: "*"}));

//Routes
app.use("/api", authlogRoutes); 
app.use("/api/foods", foodRoutes);

// protected route for admin
app.get("/api/admin", authenticateToken, (req, res) => {
    res.json({message: "Du är inloggad som Administratör"});
});

//validate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //token split from space

    if(token == null) res.status(401).json({message: "Du har inte tillgång till denna sida - Token saknas!"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if(error) return res.status(403).json({message: "Ogiltig JWT!"});
        req.user = user;
        next();
    });
}

//start application
app.listen(port, ()=> {
console.log(`Server startad på port: ${port}`);
});