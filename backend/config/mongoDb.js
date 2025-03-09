const mongoose = require("mongoose");
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')})

const connectDb = async() => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB Connection Error:", err))
}

module.exports = connectDb;