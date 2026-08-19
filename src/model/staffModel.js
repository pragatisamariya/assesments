const { required } = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt = process.env.salt;
const StaffSchema =new  mongoose.Schema({
staffName :{
    type:String,
    required:[true , "staffName to LIKH"],
    minLength: 2,
    maxLength: 50,

},
email:{
    type:String,
    required:[true, " email is required"],
    unique:true,
    lowercase:true,
    trim:true,
},
password:{
type:String , 
required:[true , " password is missing"],
minLength:6,
},
department:{
type:String,
enum:["sales" , "support" , "warehouse"],
},
} , {timestamps:true , strict : true});

StaffSchema.pre("save" , async function (){
    if(! this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password , salt);

});

const StaffModel = mongoose.model("Staff" , StaffSchema);

module.exports = StaffModel ;