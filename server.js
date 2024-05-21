/*Anne-Lii Hansen*/

const express = require("express"); //include express
const bodyParser = require("body-parser");
const cors = require("cors");//include cors
const authlogRoutes = require("./routes/authlogRoutes");//include route for auth and login
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors({origin: "*"}));

//Routes
app.use("/api", authlogRoutes); 

//start application
app.listen(port, ()=> {
console.log(`Server running at ${port}`);
});