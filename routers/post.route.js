const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const upload = require("../middleware/poost.middleware");
const {authMiddleware} = require("../middleware/auth.middleware")

router.post(
  "/",
  authMiddleware,
  upload.single("photo"),
  postController.createPost
);


router.get("/:id", postController.getPost);
router.get("/", postController.getAllPosts);

module.exports = router;
