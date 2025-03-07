const express = require("express");
// Router
const router = express.Router();
// Path
const path = require("path");
const frontendPath = path.join(__dirname, "../frontend");
// Encryption
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Database
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  es.sendFile(path.join(frontendPath, "index.html"));
});

router.post("/", (req, res) => {
  const data = req.body;

  res.json({ message: "Data received successfully", received: data });
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const registerUser = new User({ username, password: encryptedPassword });
    const userExists = await User.exists({ username: username });

    if (!userExists) {
      await registerUser.save();
      res.status(201).json({ message: "Registration successful." });
    } else {
      res.status(409).json({ message: "Username already exists." });
    }
  } else {
    res.status(400).json({ message: "Invalid username or password." });
  };
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userAccount = await User.findOne({
    username: username,
  });

  if (userAccount) {
    await bcrypt.compare(password, userAccount.password, (err, success) => {
      if (success) {
        res.status(201).json({ message: "Login successful." });
      } else {
        res.status(400).json({ message: "Password Incorrect" });
      }
    });
  } else {
    res.status(400).json({ message: "Login not found." });
  };
});

module.exports = router;