const express = require("express");
const PropertyRouter = express.Router();
const Auth = require("../middleware/userAuth");

const { addProperty, getProperty } = require("../controllers/property");

PropertyRouter.post("/addproperty", Auth(["landlord"]), addProperty);
PropertyRouter.get("/getproperty", Auth(["landlord"]), getProperty);
module.exports = PropertyRouter;
