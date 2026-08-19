const express = require("express");
require("dotenv").config();
const { connect } = require("mongoose");
const app = express();
const connectDB = require("./src/config/connectDB");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
const reviewRouter = require("./src/routs/review.routs");
const { notFound , errorHandler } = require("./src/middleware/errorHandler");
app.use("/review" , reviewRouter);
app.use(notFound);
app.use(errorHandler);
app.use("/" , (req,res)=>{
res.status(404).send("page not found");
});
connectDB().
then(()=>{
    app.listen(3000 , ()=>{
        console.log("server is listening on port:3000");
    })
})