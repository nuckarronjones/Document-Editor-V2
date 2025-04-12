// Path
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
// Encryption
const jwt = require("jsonwebtoken");
// Database
const User = require("../models/userSchema");

exports.getUserDocument =  async (req, res) => {
    const data = req.body;
    try {
      const decoded = jwt.verify(data.token, process.env.JWT_SECRET);
      const username = req.body.username;
      const documentId = req.body.documentId;
  
      if (decoded) {
        try {
          const user = await User.findOne({ username: username }).populate(
            "documents"
          );
  
          const matchedDocument = user.documents.filter(
            (document) => document.documentId === documentId
          );
  
          if (matchedDocument) {
            res.status(200).json({
              document: matchedDocument,
              message: "Retrieved user document.",
            });
          }
        } catch (error) {
          res.status(400).json({ message: "Cannot locate user documents." });
        }
      }
    } catch {
      res.status(403).json({ error: "Forbidden: Invalid token" });
    }
  };