const express = require("express");
const TenantRouter = express.Router();
const { linkProperty } = require("../controllers/tenant");
const auth = require("../middleware/userAuth");

TenantRouter.post("/linkproperty", auth(["tenant"]), linkProperty);

module.exports = TenantRouter;
