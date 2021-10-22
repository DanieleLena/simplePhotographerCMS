const { StatusCodes } = require("http-status-codes");
const { CustomAPIError, BadRequestError } = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Image = require("../models/image.model");
const Project = require("../models/project.model");
const Contact = require("../models/contact.model");

//Save to cloudinary and Save in the DB, return Image object
const uploadLandingPage = async (req, res) => {
  //access metafields from uppy
  let { name, position, caption } = req.body;

  if (position) {
    position = Number(position);
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

//Save to cloudinary and Return an Image object, DO NOT manipulate the DB
const uploadImageProjects = async (req, res) => {
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

  return res.status(StatusCodes.OK).json({ img });
};
const deleteProject = async (req,res) => {
  const {id} = req.params;
  const result = await Project.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({result});
}
 
const deleteImageProjects = async (req, res) => {
  const { projectId, imageId } = req.params;
//find the project, _id is of type Object so convert in string to compare it with the imageId
  const project = await Project.findById(projectId);
  const newImageArray = project.imageArray.filter((img) => {
    const { _id } = img;
    const id = _id.toString();
    return id !== imageId;
  });

  project.imageArray = newImageArray;

  const newProject = await Project.findByIdAndUpdate(
    { _id: projectId },
    project
  );
  res.status(StatusCodes.OK).json({ newProject });
};

const uploadProjects = async (req, res) => {
  const project = await Project.create(req.body);
  res.status(StatusCodes.OK).json({ project });
};

const uploadContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  if (!contact) {
    throw new BadRequestError("The please provide valid contcact details");
  }
  res.status(StatusCodes.OK).json({ contact });
};

const uploadProfileImage = async (req, res) => {
  //ADD to cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "simplePhotographerCMS/contact",
  });
  //delete img from tmp folder
  fs.unlinkSync(req.file.path);

  const { name, secure_url, width, height } = result;
  let imgUrl = secure_url;

  return res.status(StatusCodes.OK).json(imgUrl);
};

const editContact = async (req, res) => {
  console.log(req.body);
  const id = req.body._id;

  const contact = await Contact.findByIdAndUpdate({ _id: id }, req.body);
  res.status(StatusCodes.OK).json({ contact });
};

module.exports = {
  uploadLandingPage,
  uploadProjects,
  uploadImageProjects,
  uploadContact,
  editContact,
  uploadProfileImage,
  deleteImageProjects,
  deleteProject,
};
