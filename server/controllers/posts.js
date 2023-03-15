const User = require("../models/User.js");
const Post = require("../models/Post.js");

// CREATE
exports.createPost = async (req, res) => {
	try {
		const { userId, description, picturePath } = req.body;
		const user = await User.findById(userId);
		const newPost = new Post({
			userId,
			firstName: user.firstName,
			lastName: user.lastName,
			occupation: user.occupation,
			course: user.course,
			description,
			userPicturePath: user.picturePath,
			picturePath,
			likes: {},
			comments: [],
		});
		await newPost.save();

		const post = await Post.find();
		res.status(201).json(post);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

// READ
exports.getFeedPosts = async (req, res) => {
	try {
		const posts = await Post.find();
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

exports.getUserPosts = async (req, res) => {
	try {
		const { userId } = req.params;
		const posts = await Post.find({ userId });
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// UPDATE
exports.likePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;
		const post = await Post.findById(id);
		const isLiked = post.likes.get(userId);

		if (isLiked) {
			post.likes.delete(userId);
		} else {
			post.likes.set(userId, true);
		}

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )

		res.status(200).json(updatedPost);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
