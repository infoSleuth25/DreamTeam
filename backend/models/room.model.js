const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId : {
        type : String,
        unique : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    players :[
        {
            type : String
        }
    ],
    maxPlayers :{
        type : Number,
        default : 10
    },
    isStarted : {
        type : Boolean,
        default : false
    },
    createdAt :{
        type : Date,
        default : Date.now
    }
})

const room = mongoose.model('room',roomSchema);
module.exports = room;