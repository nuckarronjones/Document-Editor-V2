const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  documents: [
    {
      documentId: { type: String, required: true },
      documentName: { type: String, required: true },
      documentContent: { type: String, required: true },
      documentPreferences: {
        fontSize: { type: String, required: true },
        font: { type: String, required: true },
        lineSpacing: { type: String, required: true },
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
