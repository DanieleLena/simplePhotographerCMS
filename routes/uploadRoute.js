const express = require("express");
const router = express.Router();
const {
  upload,
  uploadLandingPage,
  uploadProjects,
  getLandingPageImages,
} = require("../controllers/uploadController");

router.get("/", upload);
router.route("/landingPage").post(uploadLandingPage).get(getLandingPageImages);
router.post('/projects',uploadProjects)



module.exports = router;
