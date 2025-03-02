const express = require("express");
const router = express.Router();
const userControllers = require("../../controllers/userControllers/userControllers");

router.get("/src/all", userControllers.getAllUsersControllers);
router.get("/srcById/:id", userControllers.getUserByIdControllers);
router.get("/delById/:id", userControllers.deleteUserByIdControllers)

module.exports = router;
