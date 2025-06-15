//register , login, forget password, reset

const express = require("express");
const router = express.Router();

//importing controllers
const {
    register,
    login,
    forgetPassword,
    resetPassword
} = require("../controllers/user.controllers");

router.post("/register", register);

router.post("/login", login);

router.post("/forget-password", forgetPassword);

router.post("/reset-password", resetPassword);

module.exports = router;