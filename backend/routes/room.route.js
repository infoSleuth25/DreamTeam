const express = require('express');
const router = express.Router();
const {createRoom} = require('../controllers/room.controller');
const authUser = require('../middlewares/auth.middleware');

router.post('/create',authUser,createRoom);

module.exports = router;