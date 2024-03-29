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

const port = process.env.PORT || 5000;

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

// app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async () => {
 
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));

};
// hosting on heroku ==========================================
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    
  });
}

// hosting on heroku ==========================================


start();
