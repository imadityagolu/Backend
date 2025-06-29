//Role Based Access Controlle

const authorizer = (roles) => {

    return function (req, res, next){
        const hasAccess = roles.includes(req.user.role);
        if(hasAccess){
            next();
        } else {
            res.status(403).json({
                success: false,
                message: "Forbiden"
            });
        }
    };

}

module.exports = authorizer;