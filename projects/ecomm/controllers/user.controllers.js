const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res) => {

    //input data in db + hash Password
    await userModel.create(req.body);

    console.log("Register Api hit");
    
    res.json({
        success: true,
        message: "Register Api"
    });
};

const login = async (req, res) => {
    const user = await userModel.findOne({email: req.body.email});
    if(!user){
        res.status(400).json({
            success: false,
            message: "user does not exist"
        });
    return;
    }
    const plainTextPassword = req.body.password;
    const hashPassword = user.password;
    
    //bceypt compare
    const isPassword = await bcrypt.compare(plainTextPassword, hashPassword);
    
    if(!isPassword){
        res.status(400).json({
            success: false,
            message: "Inncorrect password"
        });
        return;
    }

    //creating jwt token
    const jwtData = {
        id: user._id,
        email: user.email
    }
    const userToken = jwt.sign(jwtData, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

    // to set token in cookie
    res.cookie("jwt", userToken);

    res.status(200).json({
        success: true,
        message: "Login Api",
        token: userToken
    });
};

const forgetPassword = async (req, res) => {
    res.json({
        success: true,
        message: "Register Api"
    })
};

const resetPassword = async (req, res) => {
    res.json({
        success: true,
        message: "Register Api"
    })
};

const userController = {
    register,
    login,
    forgetPassword,
    resetPassword
};

module.exports = userController;