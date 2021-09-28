const mongoose = require("mongoose");
const ImageSchema = require("./image.model").schema;

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide a name"],
    minLength: 3,
    maxLength: 25,
  },
  description: {
    type: String,
    minLength: 0,
    maxLength: 500,
  },
    //   imageProfile: [ImageSchema],
  instagram: {
      type: String,
  },
  email: {
      type: String,
      match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  }
});

module.exports = mongoose.model("Contact", ContactSchema);
