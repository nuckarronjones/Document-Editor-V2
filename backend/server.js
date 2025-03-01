const express = require("express");
const app = express();
// Database
const mongoose = require("mongoose");
const User = require("./models/userSchema");
// Environment
require("dotenv").config();
const path = require("path");
const port = process.env.DOMAIN || 3000;
const frontendPath = path.join(__dirname, "../frontend");
// Authentication
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware
app.use(express.static(frontendPath));
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routing
app.get("/", (req, res) => {
  es.sendFile(path.join(frontendPath, "index.html"));
});

app.post("/", (req, res) => {
  const data = req.body;
  console.log("Received data:", data);

  res.json({ message: "Data received successfully", received: data });
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ error: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

      // Generate JWT Token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ message: "Login successful!", token });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// App Listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
