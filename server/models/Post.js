const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		occupation: {
			type: String,
			required: true,
		},
		course: String,
		description: String,
		picturePath: String,
		userPicturePath: String,
		likes: {
			type: Map,
			of: Boolean,
		},
		comments: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
