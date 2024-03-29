const User = require("../models/User");

// READ
exports.getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

exports.getUserClassmates = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		const classmates = await Promise.all(
			user.classmates.map((id) => User.findById(id))
		);
		const formattedClassmates = classmates.map(
			({
				_id,
				firstName,
				lastName,
				occupation,
				nationality,
				picturePath,
				course,
			}) => {
				return {
					_id,
					firstName,
					lastName,
					occupation,
					nationality,
					picturePath,
					course,
				};
			}
		);
		res.status(200).json(formattedClassmates);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

exports.getUserFriends = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		const friends = await Promise.all(
			user.friends.map((id) => User.findById(id))
		);
		const formattedFriends = friends.map(
			({
				_id,
				firstName,
				lastName,
				occupation,
				nationality,
				picturePath,
				course,
			}) => {
				return {
					_id,
					firstName,
					lastName,
					occupation,
					nationality,
					picturePath,
					course,
				};
			}
		);
		res.status(200).json(formattedFriends);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// UPDATE
exports.addRemoveFriend = async (req, res) => {
	try {
		const { id, friendId } = req.params;
		const user = await User.findById(id);
		const friend = await User.findById(friendId);

		if (user.friends.includes(friendId)) {
			user.friends = user.friends.filter((id) => id !== friendId);
			friend.friends = friend.friends.filter((id) => id !== id);
		} else {
			user.friends.push(friendId);
			friend.friends.push(id);
		}
		await user.save();
		await friend.save();

		const friends = await Promise.all(
			user.friends.map((id) => User.findById(id))
		);
		const formattedFriends = friends.map(
			({
				_id,
				firstName,
				lastName,
				occupation,
				nationality,
				picturePath,
				course,
			}) => {
				return {
					_id,
					firstName,
					lastName,
					occupation,
					nationality,
					picturePath,
					course,
				};
			}
		);

		res.status(200).json(formattedFriends);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
