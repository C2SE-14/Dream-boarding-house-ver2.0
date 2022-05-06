const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const registerAccount = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const {username, email, phoneNumber} = req.body;
    const password = hashed;
    const isUserName = await User.findOne({username: username})
    const isEmail = await User.findOne({email: email});
    if(isUserName && !isEmail) {
      return res.status(203).json({
        code: 0,
        message: 'username already exists'
      })
    }
    if(isEmail && !isUserName) {
      return res.status(203).json({
        code: 0,
        message: 'Email already exists'
      })
    }
    if(isUserName && isEmail) {
      return res.status(203).json({
        code: 0,
        message: 'username and email already exists'
      })
    }
    if(!isUserName && !isEmail) {
      const newUser = new User({
        username: username,
        email: email,
        password: password,
        phoneNumber: phoneNumber
      })
      newUser.save(function (err) {
        if(err) 
          return res.status(203).json({
            code: 0,
            message: 'Something went wrong, try it again'
          })
        return res.status(200).json({
          code: 1,
          message: 'Create account successfully'
        })
      })
    }
  } catch (error) {
    return res.json(203).json({
      code: 0,
      message: `${error}`
    })
  }
}
module.exports = { registerAccount };