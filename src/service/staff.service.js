const {StaffModel} = require("../model");
const express = require("express");
const {conflict , unauthorized , notFound} = require("../utils/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RegisterService = async (data)=>{
 const {staffName , email , password , department} = data;
  const alreadyExist = await StaffModel.findOne({email});
  if(alreadyExist){
throw conflict(" email already exists");

  }

  const staff = await StaffModel.create({
    staffName,
    email,
    password,
    department,
  });
  const response = await StaffModel.findById(staff._id).select("-password");

  return response;
}

const loginService = async (data)=>{
    const {email , password , department} = data;
    const alreadyExist = await StaffModel.findOne({email});
    if(!alreadyExist){
        throw unauthorized("invalid  email or password");

    }

    const match = await bcrypt.compare(password , alreadyExist.password
    )
     if(!match){
        throw unauthorized("invalid  email or password");

    }
    const token = jwt.sign({
        id:alreadyExist._id ,
        department: alreadyExist.department
    } ,process.env.secretKey , {
        expiresIn : "1h"
    } );
    const response = await StaffModel.findById(alreadyExist._id).select("-password");
    return {
        token , response
    };

};

const GetMe = async (req)=>{
   try {const staff = await StaffModel
      .findById(req.user.id)
      .select("-password");

    if (!staff) {
      throw notFound("Staff not found");
    }
    return staff;}
    catch(err){
        console.log(err);
    }

}


module.exports = {loginService , RegisterService, GetMe};
