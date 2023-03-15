const express = require("express");
const {
	getUser,
	getUserClassmates,
	getUserFriends,
	addRemoveFriend,
} = require("../controllers/users.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

// READ
router.get("/:id", verifyToken, getUser);
router.get(":id/classmates", verifyToken, getUserClassmates);
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;