const mongoose = require('mongoose');

function connectToDb(url){
    mongoose.connect(url)
    .then(()=>{
        console.log("Connection Successful");
    })
    .catch((err)=>{
        console.log("No Connection");
        console.log(err);
    })
}

module.exports = connectToDb;