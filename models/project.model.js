const mongoose = require("mongoose");
const ImageSchema = require("./image.model").schema;

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide a name"],
    minLength: 3,
    maxLength: 25,
  },
  thumbnail: {
    type: String,
    minLength: 3,
    require: [true, "Please provide a thumbnail"],
  },
  subtitle: {
    type: String,
    minLength: 0,
    maxLength: 50,
  },
  description: {
    type: String,
  },
  imageArray: [ImageSchema],

});


module.exports = mongoose.model("Project", ProjectSchema);

    
