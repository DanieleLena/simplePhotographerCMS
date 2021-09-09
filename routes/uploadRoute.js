const express = require("express");
const router = express.Router();
const { upload } = require("../controllers/uploadController");

router.get("/", upload);
// router.post("/login", login);


module.exports = router;
