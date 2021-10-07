const express = require("express");
const router = express.Router();
const {
  uploadLandingPage,
  uploadProjects,
  uploadImageProjects,
  uploadContact,
  editContact,
  uploadProfileImage,
  deleteImageProjects,
  deleteProject,
} = require("../controllers/uploadController");

router.route("/landingPage").post(uploadLandingPage);
router.route("/projects").post(uploadProjects);
router.route("/projects/delete/:id").delete(deleteProject)
router.route("/projects/image").post(uploadImageProjects);
router
  .route("/projects/image/delete/:projectId/:imageId")
  .delete(deleteImageProjects);
router.route("/contact").post(uploadContact).put(editContact);
router.route("/contact/profileImage").post(uploadProfileImage);

module.exports = router;
