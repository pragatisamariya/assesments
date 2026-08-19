const staffService = require("../service/staff.service");

const registerController = async (req,res)=>{
  try  {const {staffName, email , password , department} = req.body;
    const response = await staffService.RegisterService({staffName, email , password , department});

    return res.status(201).send({
        success:true,
        message:"register successfully" ,
        response,
    });}
    catch(err){
        console.log(err);
         next(err);
    }
}

const loginController = async (req,res)=>{
  try { const {email , password , department} = req.body;
    const {token , response} = await staffService.loginService({email , password , department});
    res.cookie("token" , token , {httpOnly:true , samesite:true});

    return res.status(200).send({
        success:true,
        message:"login successfully" ,
        response,
    });}
    catch(err){

        console.log(err);
        next(err);
    }
}

const meController = async (req, res) => {
  try {
    const staff = await staffService.GetMe(req);
    return res.status(200).json({
      success: true,
      data: staff
    });

  } catch (err) {
    console.log(err);
     next(err);
  }
};
const logout = async (req,res)=>{
    try{
    res.clearCookie("token" , {httpOnly:true , samesite:true});
 return res.status(200).json({
      success: true,
      message: "Logout successful"
    });

    }
    catch(err){
        console.log(err);
         next(err);
    }
}
module.exports = {loginController , registerController , meController , logout}