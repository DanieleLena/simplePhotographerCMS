const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, BadRequestError } = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Image = require("../models/image.model");
const Project = require("../models/project.model");

const upload = async (req, res) => {
  console.log("private route!!!");
  res.status(StatusCodes.OK).send("<h2>Sono nella private route</h2>");
};
//Save to cloudinary and Save in the DB, return Image object
const uploadLandingPage = async (req, res) => {
  //access metafields from uppy
  let { name, position, caption } = req.body;

  if (position) {
    position = Number(position);
  }

  if (Number.isNaN(position)) {
    fs.unlinkSync(req.file.path);
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

 const { secure_url, width, height } = result;
 let imgUrl = secure_url;

  let img = {
    name,
    position,
    caption,
    imgUrl,
    width,
    height,
  };
  console.log(img);

  const image = await Image.create(img);

  return res.status(StatusCodes.CREATED).json(image);
};
const getLandingPageImages = async (req, res) => {
  const images = await Image.find({});
  res.status(StatusCodes.OK).json({ images });
};

//Save to cloudinary and Return an Image object, DO NOT manipulate the DB
const uploadImageProjects = async (req, res) => {
  console.log(req.body);
  let { name, position, caption } = req.body;
 

  if (position) {
    position = Number(position);
  }

  //ADD to cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "simplePhotographerCMS/projects",
  });
  //delete img from tmp folder
  fs.unlinkSync(req.file.path);

  const {secure_url,width,height} = result;
  let imgUrl = secure_url;

  let img = {
    name,
    position,
    caption,
    imgUrl,
    width,
    height,
  };


  return res.status(StatusCodes.OK).json({ img });
};


const uploadProjects = async (req, res) => {
  console.log(req.body);
  const project = await Project.create(req.body);

  res.status(StatusCodes.OK).json({ project });
};
const getAllProject = async (req, res) => {
  try {
   const projects = await Project.find({});
    res.status(StatusCodes.OK).json({ projects }); 
  } catch (error) {
    throw new BadRequestError();
  }
  
};

module.exports = {
  upload,
  uploadLandingPage,
  getLandingPageImages,
  uploadProjects,
  uploadImageProjects,
  getAllProject,
};
