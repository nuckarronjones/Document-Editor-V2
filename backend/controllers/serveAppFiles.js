// Path
const path = require("path");
const frontendPath = path.join(__dirname, "../../frontend");

exports.serveAppFiles = (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
};