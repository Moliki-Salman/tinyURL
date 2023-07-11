const express = require("express");
const router = express.Router();

const controller = require("../controller/userController");

router.post("/signup", controller.signup);
router.post("/login", controller.login);

module.exports = router;
