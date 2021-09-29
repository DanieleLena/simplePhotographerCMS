const express = require("express");
const router = express.Router();
const {
  upload,
  uploadLandingPage,
  uploadProjects,
  getLandingPageImages,
  uploadImageProjects,
  getAllProject,
  uploadContact,
  editContact,
  getContact,
  uploadProfileImage,
} = require("../controllers/uploadController");

router.get("/", upload);
router.route("/landingPage").post(uploadLandingPage).get(getLandingPageImages);
router.route("/projects").post(uploadProjects).get(getAllProject);
router.route("/projects/image").post(uploadImageProjects);
router.route("/contact").post(uploadContact).put(editContact).get(getContact);
router.route("/contact/profileImage").post(uploadProfileImage);






module.exports = router;
