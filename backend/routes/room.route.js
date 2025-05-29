const express = require('express');
const router = express.Router();
const {createRoom, joinRoom,startRoom} = require('../controllers/room.controller');
const authUser = require('../middlewares/auth.middleware');

router.post('/create',authUser,createRoom);
router.post('/join',authUser,joinRoom);
router.post('/start',authUser,startRoom);

module.exports = router;