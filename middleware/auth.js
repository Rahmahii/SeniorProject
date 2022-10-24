const jwt = require('jsonwebtoken');
require("dotenv").config();

function checkAuth(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1]; 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decodedToken;
        // res.json({
        //     'message': "login success",
        //     "statuse":"valid"
        // });
        next();
    }catch(e){
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error':e,
            'status':false
        });
    }
}

module.exports = {
    checkAuth: checkAuth
}