const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postControllers/postControllers.js");
const multerMiddleware = require("../../middleware/multer.middleware.js");

router.get("/src/all", postController.getAllPostsController);
router.get("/srcById/:id", postController.getSinglePostsController);
router.get("delById/:id", postController.removeSinglePostController);
router.get("srcByUsrId/:id", postController.getPostsByUserController);
router.post("/crt", multerMiddleware.single("postThumbnail"),postController.createPostsController);
// router.post("/uptById/:id");

module.exports = router;
