const express = require("express");
const router = express.Router();
const { signup, login, selectRole } = require("../controllers/auth");

router.post("/signup", signup);

router.post("/login", login);

router.post("/role/:id", selectRole);

module.exports = router;
