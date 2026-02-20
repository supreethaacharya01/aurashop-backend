const jwt = require("jsonwebtoken")
require('dotenv').config()
const SECRET = process.env.SECRET_KEY;

const authuser = async(req, res, next) => {
    try {
        const userToken = req.header("auth-token");
        
        if(!userToken) {
            return res.json({success:false, message:"No token provided"})
        }
        
        const userdata = jwt.verify(userToken, SECRET);
        req.userId = userdata.id;  // Store user ID
        req.userRole = userdata.role;  // Store user role
        next();
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Invalid or expired token"})
    }
}

const isAdmin = async (req, res, next) => {
    try {
        if (req.userRole === "admin") {
            next();
        } else {
            res.json({ success: false, message: "Access Denied. Admin Only." });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Unauthorized access" });
    }
}

module.exports = {authuser, isAdmin};