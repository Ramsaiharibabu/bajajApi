const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection URI and Port configuration
const MONGO_URI =
  "mongodb+srv://haribabu91000:RRIwMiq1Owl84gYZ@project1capstone.zmzit.mongodb.net/?retryWrites=true&w=majority&appName=project1Capstone";
const PORT = 5000;

// MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  gender: String,
  image: String,
});

const User = mongoose.model("User", userSchema);

// Route to handle form submission
app.post("/api/users", upload.single("image"), async (req, res) => {
  try {
    const { name, email, age, gender } = req.body;
    const image = req.file ? req.file.filename : null;

    const user = new User({ name, email, age, gender, image });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
