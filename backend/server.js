import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  try {
    const { fullName, email, universityId, role, department, password } = req.body;

    if (!fullName || !email || !universityId || !password) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    if (role === "Student" && !department) {
      return res.status(400).json({ message: "Department is required for students" });
    }

    const user = await User.create({
      fullName,
      email,
      universityId,
      role,
      department,
      password
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json(userData);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email or University ID already exists" });
    }
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Invalid user ID" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
