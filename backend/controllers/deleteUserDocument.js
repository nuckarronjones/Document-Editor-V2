// Path
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
// Encryption
const jwt = require("jsonwebtoken");
// Database
const User = require("../models/userSchema");

exports.deleteUserDocument = async (req, res) => {
  const data = req.body;
  const { username, documentId, token } = data;

  if (!username || !documentId || !token) {
    return res
      .status(400)
      .json({ error: "Missing username, documentId, or token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.documents = user.documents.filter(
      (document) => document.documentId !== documentId
    );

    await user.save();

    res.status(200).json({
      message: "Deleted user document successfully.",
    });
  } catch (error) {
    console.error("Error:", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res
        .status(403)
        .json({ error: "Forbidden: Invalid or expired token" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};
