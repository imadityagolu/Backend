const userModel = require("../models/user.models");

const register = async (req, res) => {

    //input data in db
    await userModel.create(req.body);
    console.log("Register Api hit");
    
    res.json({
        success: true,
        message: "Register Api"
    })
};

const login = async (req, res) => {
    res.json({
        success: true,
        message: "Register Api"
    })
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