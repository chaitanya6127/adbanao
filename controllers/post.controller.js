const { Post } = require("../model/post.model");
const { Category } = require("../model/catagory.model");
const cloudinary = require("cloudinary").v2;
const path = require("path");

exports.createPost = async (req, res) => {
  try {
    const { categoryIds } = req.body;
    const file = req.file;

    if (!categoryIds || categoryIds.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one category is required" });
    }

    const categories = await Category.find({ _id: { $in: categoryIds } });

    if (!file) {
      return res.status(400).json({ error: "Photo file is required" });
    }

    if (!req.user || !req.user.username) {
      return res.status(400).json({ error: "User information not available" });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: `Posts/${req.user.username}`,
    });

    console.log(result);

    const post = new Post({
      userId: req.user._id,
      categories: categories.map((category) => category._id),
      url: result.url,
      cloudinary_id: result.asset_id,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("categories");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("categories");
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
