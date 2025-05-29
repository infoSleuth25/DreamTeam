const Room = require('../models/room.model');
const { v4: uuidv4 } = require('uuid');

async function createRoom(req,res){
    try{
        const roomId = uuidv4().slice(0, 6);
        const userId = req.user._id;
        const room = await Room.create({
            roomId : roomId,
            createdBy : userId,
            players : [userId]
        })
        res.status(201).json({
            msg : "Room has created successfully",
            roomId : room.roomId
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({ msg: "Server error while creating room" });
    }
}

module.exports = {createRoom};