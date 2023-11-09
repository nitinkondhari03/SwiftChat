const User=require("../model/userModel")
const brcypt=require("bcrypt")

module.exports.register=async(req,res,next)=>{
    try {
      const {username,email,password}=req.body;
      const usernamecheck=await User.findOne({username})
      if(usernamecheck){
       return res.json({msg:"Username already used",status:false})
      }
      const emailcheck=await User.findOne({email})
      if(emailcheck){
       return res.json({msg:"Email already used",status:false})
      }
      const hashPassword=await brcypt.hash(password,10)
      const user=await User.create({
       email,username,password:hashPassword
      })
      delete user.password
      return res.json({status:true,user})
    } catch (error) {
      next(error)
    }
};

