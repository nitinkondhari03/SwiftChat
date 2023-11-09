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
    const users= await User.findOne({ username });
    if (!users) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    const isPasswordValid=await brcypt.compare(password,users.password);
    if(!isPasswordValid){
      return res.json({ msg: "Incorrect username or password", status: false })
    }
    delete users.password;
    
    return res.json({ status: true, users });
  } catch (error) {
    next(error);
  }
};
