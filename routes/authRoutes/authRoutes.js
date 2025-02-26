const express = require("express");
const router = express.Router();
const authControllers = require("../../controllers/authControllers/authControllers.js");
const multerMiddleware = require("../../middleware/multer.middleware.js");

router.post(
  "/register",
  multerMiddleware.single("userImg"),
  authControllers.registerUserController
);
router.post("/login", authControllers.loginUserController);

module.exports = router;
