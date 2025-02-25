const express = require ("express");
const router = express.Router();
const authControllers = require ("../../controllers/authControllers/authControllers.js");

router.post("/register", authControllers.registerUserController);
router.post("/login", authControllers.loginUserController);

module.exports = router;