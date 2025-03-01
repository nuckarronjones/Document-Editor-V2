const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path");

//Configure relative .env path
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = {
  client
};