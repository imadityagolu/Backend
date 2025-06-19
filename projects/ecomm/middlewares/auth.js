const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

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
        const tokenVerify = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(tokenVerify);
        //to get token data
        // const tokenData = jwt.decode(token);

        next();
    } catch (error) {
        res.status(400).json({
        status: false,
        message: "unauthorized"
        });
    }
};

module.exports = authMiddleware;