const mongoose = require('mongoose');
require("dotenv").config();

exports.connect = (req,res) =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(
        console.log("DB connected successfully")
    )
    .catch((error)=>{
        console.log("Error in db connection");
        console.error(error);
        process.exit(1);
    });
}