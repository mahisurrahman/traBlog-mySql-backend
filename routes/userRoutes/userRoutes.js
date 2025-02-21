const express = require("express");
const router = express.Router();
const userControllers = require("../../controllers/userControllers/userControllers");

router.get("/src/all", userControllers.getAllUsersControllers);

module.exports = router;
