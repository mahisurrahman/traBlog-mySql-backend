const express = require("express");
const router = express.Router();

const categoryController = require("../../controllers/categoryController/categoryController.js");

router.post("/crt", categoryController.crtCategoryController);

module.exports = router;
