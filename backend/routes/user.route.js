const express = require('express');
const router = express.Router();
const {registerUser, loginUser,getUserProfile, logoutUser} = require('../controllers/user.controller');
const authUser = require('../middlewares/auth.middleware'); 

router.post('/login',loginUser);
router.post('/register',registerUser);
router.get('/profile',authUser, getUserProfile);
router.get('/logout',authUser, logoutUser);

module.exports = router;