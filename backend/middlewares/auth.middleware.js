const User = require('../models/user.model');
const {blackListToken} = require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');

async function authUser(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({
            msg : "Unauthorized"
        })
    }
    const isBlackListed = await blackListToken.findOne({token});
    if(isBlackListed){
        return res.status(401).json({
            msg : "Unauthorized"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        req.user = user;
        return next();
    }
    catch(err){
        return res.status(401).json({
            msg : "Unauthorized"
        })
    }
}

module.exports = authUser;