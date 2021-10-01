const express = require("express");
const router = express.Router();
const {
  uploadLandingPage,
  uploadProjects,
  uploadImageProjects,
  uploadContact,
  editContact,
  uploadProfileImage,
} = require("../controllers/uploadController");


router.route("/landingPage").post(uploadLandingPage);
router.route("/projects").post(uploadProjects)
router.route("/projects/image").post(uploadImageProjects);
router.route("/contact").post(uploadContact).put(editContact);
router.route("/contact/profileImage").post(uploadProfileImage);






module.exports = router;
