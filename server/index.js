const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath } = require("url");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users/js");
const { register } = require("./controllers/auth.js");

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/assets");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

// ROUTES WITH FILES
app.post("auth/register", upload.single("picture"), register);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
	})
	.catch((err) => console.log(`${err} did not connect`));
