const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        minlength : [5,'email should be 5 characters long']
    },
    password :{
        type : String,
        required : true,
        select : false
    }
})

const User = mongoose.model('user',userSchema);
module.exports = User;