const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  documents: {
    type: [
      {
        documentId: { type: String },
        documentName: { type: String, required: true },
        documentContent: { type: String, required: true },
        documentPreferences: {
          fontSize: { type: String, required: true },
          font: { type: String, required: true },
          lineSpacing: { type: String, required: true },
        },
      },
    ],
    default: [],
    validate: {
      validator: function (docs) {
        if (!Array.isArray(docs) || docs.length === 0) return true;
        return docs.every((doc) => doc.documentId && doc.documentName && doc.documentContent);
      },
      message: "If documents are provided, all fields must be filled in.",
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;