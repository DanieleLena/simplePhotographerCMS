const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, BadRequestError } = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Image = require("../models/image.model");
const Project = require("../models/project.model");
const Contact = require("../models/contact.model");


const getLandingPageImages = async (req, res) => {
  const images = await Image.find({});
  res.status(StatusCodes.OK).json({ images });
};

const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(StatusCodes.OK).json({ projects });
  } catch (error) {
    throw new BadRequestError();
  }
};
const getSingleProject = async (req, res) => {
  const data = await Project.findById(req.params.id);
  if (!data) {
    throw new BadRequestError("Project not found.");
  }

  res.status(StatusCodes.OK).json({ data });
};
const getContact = async (req, res) => {
  try {
    const contact = await Contact.find({});
    res.status(StatusCodes.OK).json({ contact });
  } catch (error) {
    throw new BadRequestError();
  }
};


module.exports = {
  getLandingPageImages,
  getAllProject,
  getSingleProject,
  getContact,
};