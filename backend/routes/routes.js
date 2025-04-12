// Express
const express = require("express");
// Router
const router = express.Router();
// Controllers
const { saveDocument } = require("../controllers/saveDocument");
const { registerUser } = require("../controllers/registerUser");
const { loginUser } = require("../controllers/loginUser");
const { getAllUserDocuments } = require("../controllers/getAllUserDocuments");
const { getUserDocument } = require("../controllers/getUserDocument");
const { deleteUserDocument } = require("../controllers/deleteUserDocument");
const { serveAppFiles } = require("../controllers/serveAppFiles");

router.get("*", serveAppFiles);

router.post("/save", saveDocument);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/allUserDocuments", getAllUserDocuments);

router.post("/userDocument", getUserDocument);

router.post("/deleteDocument", deleteUserDocument);

module.exports = router;