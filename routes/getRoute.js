const express = require('express');
const router = express.Router();


const {
  getLandingPageImages,
  getAllProject,
  getSingleProject,
  getContact,
} = require("../controllers/getController");



router.route("/landingPage").get(getLandingPageImages);
router.route("/projects").get(getAllProject);
router.route("/projects/:id").get(getSingleProject);
router.route("/contact").get(getContact);


module.exports = router;
