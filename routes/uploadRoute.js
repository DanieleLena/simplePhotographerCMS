const express = require("express");
const router = express.Router();
const { upload,uploadLandingPage } = require("../controllers/uploadController");

router.get("/", upload);
router.post("/landingPage", uploadLandingPage);



module.exports = router;
