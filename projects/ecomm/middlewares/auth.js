const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userModel = require("../models/user.models");

const authMiddleware = async (req, res, next) => {
    
    //require authorisation
    const token = req.headers.authorization?.split(" ")?.[1];
    if(!token){
        res.status(401).json({
            status: false,
            message: "invalide token"
        });
        return;
    }

    try {
        // check if token generated from our site or not with .env jwt secrete key
        // also checks if token is expired or not
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // to verify the new updated token is valid or not
        const user = await userModel.findById(data.id);

        //pass the data of user to further apis
        req.user = user;
        
        if(user.jwt !== token){
            throw new Error("new unauthorized user");
        }

        //to get token data
        // const tokenData = jwt.decode(token);

        next();

    } catch (error) {
        res.status(400).json({
        status: false,
        message: "invalide token"
        });
    }
};

module.exports = authMiddleware;