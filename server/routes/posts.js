const express = require("express");
const {
	getFeedPosts,
	getUserPosts,
	likedPost,
} = require("../controllers/posts.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

// UPDATE
router.patch("/:id/like", verifyToken, likedPost);

export default router;
