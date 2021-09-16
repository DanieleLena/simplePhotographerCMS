const multer = require("multer");
const path = require('path');

const imagePath = path.join(__dirname,'../tmp/');

const storage = multer.diskStorage({
  destination: imagePath,
  filename:(req,file,cb) => {


    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null,fileName)
  }
});

const multerMiddleware = multer({ storage }).single("photo");



module.exports = multerMiddleware;