const User = require("../model/userModel");
const brcypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernamecheck = await User.findOne({ username });
    if (usernamecheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailcheck = await User.findOne({ email });
    if (emailcheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username,password } = req.body;
    const user= await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    const isPasswordValid=await brcypt.compare(password,user.password);
    if(!isPasswordValid){
      return res.json({ msg: "Incorrect username or password", status: false })
    }
    delete user.password;
    
    return res.json({ status: true, user});
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar=async(req,res,next)=>{
try {
  const userId=req.params.id;
  const avatarImage=req.body.image;
  const userData=await User.findByIdAndUpdate(userId,{
    isAvatarImageSet:true,
    avatarImage,
  });
  return res.json({
    isSet:userData.isAvatarImageSet,
    image:userData.avatarImage
  })
} catch (error) {
  next(error)
}
}
