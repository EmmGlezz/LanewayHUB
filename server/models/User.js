const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 2,
			max: 50,
		},
		lastName: {
			type: String,
			required: true,
			min: 2,
			max: 50,
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 5,
		},
		picturePath: {
			type: String,
			default: "",
		},
		classmates: {
			type: Array,
			default: [],
		},
		friends: {
			type: Array,
			default: [],
		},
		nationality: {
			type: String,
			required: true,
		},
		occupation: {
			//Either Student / Teacher / Staff
			type: String,
			required: true,
		},
		course: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
