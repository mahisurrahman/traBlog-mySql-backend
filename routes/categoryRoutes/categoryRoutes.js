const express = require("express");
const router = express.Router();

const categoryController = require("../../controllers/categoryController/categoryController.js");

router.post("/crt", categoryController.crtCategoryController);
router.get("/src/all", categoryController.getAllCategoryController);
router.get("/srcById/:id", categoryController.getSingleCategoryController);
router.get("/del/id", categoryController.deleteSingleCategoryController);

module.exports = router;
