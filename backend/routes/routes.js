const express = require("express");
// Router
const router = express.Router();
// Path
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const frontendPath = path.join(__dirname, "../../frontend");
// Encryption
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Database
const User = require("../models/userSchema");

router.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

router.post("/save", async (req, res) => {
  const data = req.body;

  try {
    const decoded = jwt.verify(data.token, process.env.JWT_SECRET);

    if (decoded) {
      try {
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
      } catch (error) {
        console.error("Error adding posts:", error);
      }
    }
  } catch {
    res.status(403).json({ error: "Forbidden: Invalid token" });
  }
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
  }
});

router.post("/login", async (req, res) => {
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
});

router.post("/allUserDocuments", async (req, res) => {
  const data = req.body;
  try {
    const decoded = jwt.verify(data.token, process.env.JWT_SECRET);
    const username = req.body.username;

    if (decoded) {
      try {
        const user = await User.findOne({ username: username }).populate(
          "documents"
        );
        const userDocuments = user.documents;

        if (userDocuments) {
          res.status(200).json({
            documents: user.documents,
            message: "Retrieved user documents.",
          });
        }
      } catch (error) {
        res.status(400).json({ message: "Cannot locate user documents." });
      }
    }
  } catch {
    res.status(403).json({ error: "Forbidden: Invalid token" });
  }
});

router.post("/userDocument", async (req, res) => {
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
});

router.post("/deleteDocument", async (req, res) => {
  const data = req.body;
  const { username, documentId, token } = data;

  if (!username || !documentId || !token) {
    return res.status(400).json({ error: "Missing username, documentId, or token" });
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

    user.documents = user.documents.filter((document) => document.documentId !== documentId);

    await user.save();

    res.status(200).json({
      message: "Deleted user document successfully.",
    });
  } catch (error) {
    console.error("Error:", error);
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Forbidden: Invalid or expired token" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
