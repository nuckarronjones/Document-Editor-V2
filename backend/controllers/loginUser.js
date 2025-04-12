const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
// Encryption
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Database
const User = require("../models/userSchema");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const userAccount = await User.findOne({
    username: username,
  });

  if (userAccount) {
    bcrypt.compare(password, userAccount.password, (err, success) => {
      if (success) {
        const secretKey = process.env.JWT_SECRET;

        if (secretKey) {
          const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
          res.status(200).json({ token: token, message: "Login successful." });
        } else {
          res.status(500).json({ message: "Missing JWT secret token." });
        }
      } else {
        res.status(400).json({ message: "Password Incorrect" });
      }
    });
  } else {
    res.status(400).json({ message: "Login not found." });
  }
};
