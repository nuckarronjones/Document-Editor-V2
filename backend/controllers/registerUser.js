// Encryption
const bcrypt = require("bcrypt");
// Database
const User = require("../models/userSchema");

exports.registerUser = async (req, res) => {
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
  }
};
