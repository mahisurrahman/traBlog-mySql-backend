const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postControllers/postControllers.js");

router.get("/src/all", postController.getAllPostsController);
router.get("/srcById/:id", postController.getSinglePostsController);
router.get("delById/:id", postController.removeSinglePostController);
router.get("srcByUsrId/:id", postController.getPostsByUserController);
router.post("/crt", postController.createPostsController);
// router.post("/uptById/:id");

module.exports = router;
