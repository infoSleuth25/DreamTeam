const User = require('../models/user.model');
const UserValidationSchema = require('../validators/user.validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const result = UserValidationSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                msg: "Please enter valid input data",
                errors: result.error.errors
            });
        }
        const { email, password } = result.data;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User is already registered" });
        }
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 8;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ email, password: hashedPassword });
        return res.status(201).json({
            msg: "User is successfully registered",
            user: {
                id: user._id,
                email: user.email
            }
        });
    } 
    catch(error){
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
}

async function loginUser(req,res){
    try{
        const result = UserValidationSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                msg : "Please enter valid input data",
                errors : result.error.errors
            })
        }
        const email = result.data.email;
        const password = result.data.password;
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({
                msg : "User is not registered"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                msg : "Invalid email or password"
            })
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});
        res.cookie('token',token);
        return res.status(200).json({
            msg : "User is succesfully logged In",
            user: {
                id: user._id,
                email: user.email
            }
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
}

module.exports = { registerUser, loginUser };
