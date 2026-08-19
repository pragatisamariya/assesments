const {  notFound:notFoundError} = require("../utils/apiError");

const notFound  = ( req,res,next) =>{
 next  ( notFoundError(` Route ${req.originalUrl} not found`)
    );
};

const errorHandler = (err,req,res,next)=>{
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";
    let errors = err.errors || [];

    if(err.name === "CastError"){
 statusCode = 400 ;
message = ` invalid value for ${err.value}`;
    }

    if(err.name === "ValidationError"){
        statusCode = 400 ;
        
        errors = Object.values(err.errors).map((e)=>({
            field:e.path,
            message : e.message ,
        }));
    }

    if(err.code === 11000){
        statusCode = 409;
        message = " this email already exists";
    }

    

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
    errors = [];
  }

  else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
    errors = [];
  }

  const response = {
    success: false,
    message,
    errors
  };

   return res.status(statusCode).json(response);
}

module.exports = {errorHandler,notFound};