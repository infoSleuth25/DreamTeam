const Room = require('../models/room.model');
const { v4: uuidv4 } = require('uuid');

async function createRoom(req,res){
    try{
        let roomId;
        do {
            roomId = uuidv4().slice(0, 6);
        }while(await Room.findOne({ roomId }));
        const userId = req.user._id;
        const room = await Room.create({
            roomId : roomId,
            createdBy : userId,
            players : [userId]
        })
        res.status(201).json({
            msg : "Room has created successfully",
            roomId : room.roomId,
            players : room.players
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({ msg: "Server error while creating room" });
    }
}

async function joinRoom(req,res){
    const roomId = req.body.roomId;
    const userId = req.user._id;
    const room = await Room.findOne({roomId});
    if(!room){
        return res.status(400).json({
            msg : "Room not found"
        })
    }
    if(room.isStarted){
        return res.status(400).json({
            msg : "Auction is already started"
        })
    }
    if (room.players.some(p => p.toString() === userId.toString())) {
        return res.status(400).json({
            msg : "You have already joined the room"
        })
    }
    if(room.players.length >= room.maxPlayers){
        return res.status(400).json({
            msg : "Room is full"
        })
    }
    room.players.push(userId);
    await room.save();
    return res.status(200).json({
        msg : "You have successfully joined the room",
        playersCount : room.players.length,
        roomId : room.roomId
    })
}

async function startRoom(req,res){
    const roomId = req.body.roomId;
    const userId = req.user._id;
    const room = await Room.findOne({roomId});
    if(!room){
        return res.status(400).json({
            msg : "Room not found"
        })
    }
    if(room.createdBy.toString() !== userId.toString()){
        return res.status(403).json({
            msg : "Only host of the room can start the auction"
        })
    }
    if(room.isStarted){
        return res.status(400).json({
            msg : "Auction is already started"
        })
    }
    const botCount = room.maxPlayers - room.players.length;
    for(let i=0;i<botCount;i++){
        room.players.push(`Bot_${i + 1}`);
    }
    room.isStarted = true;
    await room.save();
    return res.status(200).json({
        msg : "Auction has started",
        totalPlayers : room.players.length,
        players : room.players
    })
}

module.exports = {createRoom,joinRoom,startRoom};