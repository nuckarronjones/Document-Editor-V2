// Database
const User = require("../models/userSchema");
// Encryption
const jwt = require("jsonwebtoken");

exports.saveDocument = async (req, res) => {
  const data = req.body;
  const username = req.body.username;
  const documentId = req.body.documentId;

  try {
    const decoded = jwt.verify(data.token, process.env.JWT_SECRET);

    if (decoded) {
      try {
        const user = await User.findOne({ username: username }).populate(
          "documents"
        );

        const matchedDocument = user.documents.findIndex(
          (document) => document.documentId === documentId
        );

        if (matchedDocument !== -1) {
          await User.findOneAndUpdate(
            {
              username: data.username,
              "documents.documentId": data.documentId,
            },
            {
              $set: {
                "documents.$.documentName": data.documentName,
                "documents.$.documentContent": data.documentContent,
                "documents.$.documentPreferences": data.documentPreferences,
              },
            },
            { new: true }
          );
        } else {
          await User.findOneAndUpdate(
            { username: data.username },
            {
              $push: {
                documents: {
                  documentId: data.documentId,
                  documentName: data.documentName,
                  documentContent: data.documentContent,
                  documentPreferences: data.documentPreferences,
                },
              },
            },
            { new: true }
          );
        }
      } catch (error) {
        console.error("Error saving document:", error);
      }
    }
  } catch {
    res.status(403).json({ error: "Forbidden: Invalid token" });
  }
};
