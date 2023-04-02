const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

// REGISTER USER
exports.register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			picturePath,
			nationality,
			occupation,
			course,
			friends,
		} = req.body;

		console.log('before salt')
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const passwordHash = await bcrypt.hash(password, salt);
		console.log('after salt')
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
			picturePath,
			nationality,
			occupation,
			course,
			friends,
		});
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (error) {
		res.status(500).json({ error: 'You reached register' });
	}
};

// LOGGING USER
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ msg: "User does not exist." });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		delete user.password;
		res.status(200).json({ token, user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
