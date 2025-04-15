// Encryption
const bcrypt = require("bcrypt");
// Database
const User = require("../models/userSchema");

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const userExists = await User.exists({ username: username });

    if (!userExists) {
      try {
        if (!password || !username) {
          return res
            .status(400)
            .json({ success: false, message: "Username and password are required." });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const registerUser = new User({
          username,
          password: encryptedPassword,
          documents: [],
        });

        await registerUser.save();

        res.status(201).json({success: true, message: "Registration successful." });
      } catch (error) {
        console.error("Registration error:", error);
        res
          .status(500)
          .json({
            success: false,
            message: "Server error during registration."
          });
      }
    } else {
      res.status(409).json({success: false, message: "Username already exists." });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid username or password." });
  }
};
