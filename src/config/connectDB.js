const mongoose = require("mongoose");
const dns  = require("dns");
dns.setServers(["8.8.8.8" , "8.8.4.4"]);

const url = process.env.AtlasUrl;
const connectDB = async ()=>{
    try{
    await mongoose.connect(url);
     console.log("database is connected");
    }
    catch(err){
        console.log("database connection error " ,err);
    }

};

module.exports = connectDB;