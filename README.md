# simplePhotographerCMS


![Simple Photographer CMS](https://www.danielelena.com/images/projects-images/simplePhotographerCMS-thumbnail.jpg)

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Features](#features)
  - [Useful resources](#useful-resources)

## Overview

👋 Hi, on this project I tried to create a CMS designed to build portfolios for photographers.
The front-end is made with react and SCSS and the design is taken from a website that I built previously since for this application I wanted to practice and experiment on the back-end.
On the server-side I used Node.js, Express and MongoDb.
The process of uploading images starts with the user interaction with an Uppy element, an external library that fetches files locally and from remote places like Dropbox or Instagram.
Uppy sent the files through a specific endpoint, and reach the Multer middleware, a node. js middleware for handling multipart / form-data which saves the images in a temporary folder on the server. The image is then saved in Cloudinary, the application receives back the image Url that is eventually saved on MongoDB, and the temporary folder deleted from the server.


### Links

- [LIVE PREVIEW](https://simple-photographer-cms.herokuapp.com/) to check my solution.<br/>
**NOTE**: app hosted on free Heroku server. Please allow 15-30s to spin up.



### Built with
**Front-end**:
- React
- SCSS<br/>

**Back-end**:
- Node.js
- Express
- MongoDB


### Features

- Login System with JWT to access the Admin control panel;
- Drag and drop system to upload multiple images at a time;
- Create and manage new Projects/albums for the images;
- Images are served by a **CDN**;


### Useful resources

 - [Uppy](https://uppy.io/);
 - [Multer](https://www.npmjs.com/package/multer);




## TODO:
- Handle error states in the dasboard;
- Feature to decide the order of the images displayed
- Delete the landing Page image
- Delete or modify an existing project
- layout section
- fix some loading state

