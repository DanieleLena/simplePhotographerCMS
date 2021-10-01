const express = require("express");
const app = express();
require("express-async-errors");
const connectDB = require("./db/connect");
require("dotenv").config();

const cors = require("cors");

const authRouter = require("./routes/authRoute");
const uploadRouter = require("./routes/uploadRoute");
const getRouter = require("./routes/getRoute");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticateUser = require("./middleware/authentication");
const multerMiddleware = require('./middleware/multer');
const path = require("path");

// file upload
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})



app.use(express.json());
app.use(cors());


//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/get",getRouter);
app.use("/api/v1/upload", authenticateUser,multerMiddleware, uploadRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
