const { StaffModel } = require("../model");
const {unauthorized} = require("../utils/apiError");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req,res,next)=>{
    try{
     const token = req.cookies.token;
if(!token){
    throw unauthorized("you need to login  no token available");
}
const decoded = jwt.verify(token , process.env.secretKey);

const staff = await StaffModel.findById(decoded.id);
if(!staff){
     throw unauthorized("you need to login  unauthorized");
}
req.user = staff ;

next();
    }
    catch(err){
        console.log(err);
    }
}

module.exports = authMiddleware;