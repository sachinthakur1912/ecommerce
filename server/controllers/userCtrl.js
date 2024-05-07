const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

const userCtrl = {
   register:async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        const user = await Users.findOne({email})
        if(user){
            return res.status(400).json({
                message:"Email already registered"
            })
        }
        if(password.length<8){
            return res.status(400).json({
                message:"Password should be atleast 8 characters"
            })
        }
        // password encryption
        const hashPassword = await bcrypt.hash(password,10);
        res.json({
            message:"Registeration successful"
        })
        // db me entry
        const newUser= await Users.create({
            name,
            email,
            password:hashPassword
        })
        // creating jwt to authenticate

    }catch(error){
        console.error(error)
        return res.status(500).json({
            msg:"something went wrong"
        })
    }
   }
}
module.exports = userCtrl;