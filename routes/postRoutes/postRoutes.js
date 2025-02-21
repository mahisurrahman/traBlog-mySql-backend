const express = require ("express");
const router = express.Router();
const postController = require ("../../controllers/postControllers/postControllers.js");

router.get("/src/all", postController.getAllPostsController);

module.exports = router;