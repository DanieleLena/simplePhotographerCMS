const express = require('express');
const app = express();
require("express-async-errors");
const connectDB = require('./db/connect');
require('dotenv').config();

const cors = require("cors");

const authRouter = require('./routes/authRoute');
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require("./middleware/authentication");




app.use(express.json());
app.use(cors());



//routes
app.use('/api/v1/auth',authRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);




const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
        
    }
}

start();
