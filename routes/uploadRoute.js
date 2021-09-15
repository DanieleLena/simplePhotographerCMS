const express = require("express");
const router = express.Router();
const {
  upload,
  uploadLandingPage,
  uploadProjects,
  getLandingPageImages,
  uploadImageProjects,
} = require("../controllers/uploadController");

router.get("/", upload);
router.route("/landingPage").post(uploadLandingPage).get(getLandingPageImages);
router.route("/projects/image").post(uploadImageProjects);
router.route("/projects").post(uploadProjects);





module.exports = router;
