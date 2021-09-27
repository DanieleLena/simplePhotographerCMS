const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide a name"],
    minLength: 3,
    maxLength: 50,
  },
    position: {
        type:Number,
    
  },
  caption: {
    type: String,
    minLength: 0,
    maxLength: 30,
  },
  imgUrl: {
      type: String,
      require: [true, 'Image url missing']
  }
  ,
  width: {
    type: Number,
  },
  height: {
    type: Number,
  }
});

module.exports = mongoose.model("Image", ImageSchema);
