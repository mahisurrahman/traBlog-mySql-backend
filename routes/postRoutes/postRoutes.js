const express = require ("express");
const router = express.Router();
const postController = require ("../../controllers/postControllers/postControllers.js");

router.get("/src/all", postController.getAllPostsController);
router.get("/srcById/:id");
router.get("delById/:id");
router.post("/crt", postController.createPostsController);
router.post("/uptById/:id");

module.exports = router;