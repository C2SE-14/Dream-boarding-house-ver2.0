const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        const isPassword = await bcrypt.compare(
            password,
            user.password
        );
        console.log('isPassword: ', isPassword);
        if(!user && isPassword) {
            return res.status(203).json({
                code: 0,
                message: 'wrong email'
            })
        }
        if(user && !isPassword) {
            return res.status(203).json({
                code: 0,
                message: 'wrong password'
            })
        }
        if(!user && !isPassword) {
            return res.status(203).json({
                code: 0,
                message: 'wrong email and password'
            })
        }
        if(user && isPassword) {
            const accessToken = jwt.sign({
                user_id:user._id,
                username: user.username,
                createdAt:user.createdAt,
                updatedAt:user.updatedAt,
            },process.env.JWT_ACCESS_KEY,
            {expiresIn:"1h"}
            );
                const refreshToken=jwt.sign({
                user_id:user._id,
                username: user.username,
                createdAt:user.createdAt,
                updatedAt:user.updatedAt,
            },process.env.JWT_REFRESHTOKEN_KEY,
            {expiresIn:"2h"}
            
            );
            const userInClient = {
                user_id:user._id,
                username: user.username,
                userAvt: user.avatar
            }
            return res.status(200).json({
                code: 1,
                message: 'Login successfully',
                user: userInClient,
                accessToken: accessToken,
                refreshToken: refreshToken,
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(203).json({
            message: `${error}`
        })
    }
}
module.exports = { login };