const express = require("express");
const app = express();
// Environment
require("dotenv").config();
const path = require("path");
const port = process.env.DOMAIN || 3000;
const frontendPath = path.join(__dirname, "../frontend");

// Middleware
app.use(express.static(frontendPath));
app.use(express.json());

// Routes
const routes = require("./routes/routes");
app.use("/",routes);

// App Listen
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});