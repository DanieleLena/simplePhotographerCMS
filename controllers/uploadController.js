const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, BadRequestError } = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Image = require("../models/image.model");
const Project = require('../models/project.model')

const upload = async (req, res) => {
  console.log("private route!!!");
  res.status(StatusCodes.OK).send("<h2>Sono nella private route</h2>");
};

const uploadLandingPage = async (req, res) => {
  //access metafields from uppy
  let { name, position, caption } = req.body;

  if (position) {
    position = Number(position);
  }

  console.log(position);
  if (Number.isNaN(position)) {
    throw new BadRequestError(
      `The position field in ${name} must be a Number, please press on "Cancel" and try again`
    );
  }

  //ADD to cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "simplePhotographerCMS/landingPage",
  });
  //delete img from tmp folder
  fs.unlinkSync(req.file.path);

  let imgUrl = result.secure_url;

  let img = {
    name,
    position,
    caption,
    imgUrl,
  };
  console.log(img);

  const image = await Image.create(img);

  return res.status(StatusCodes.CREATED).json(image);
};
const getLandingPageImages = async (req,res) => {

  const images = await Image.find({});
  res.status(StatusCodes.OK).json({images});

}

const uploadProjects = async (req,res) => {
  const {name,thumbnail,subtitle,description,images} = req.body;

  const newProject = {
    name,
    thumbnail,
    subtitle,
    description,
    images,
  };

    const project = await Project.create(newProject);
    return res.status(StatusCodes.CREATED).json(project);



}

module.exports = {
  upload,
  uploadLandingPage,
  getLandingPageImages,
  uploadProjects,
};
