const express = require('express');
const { RegisterUser, LoginUser } = require('../controllers/userController');

const router = express.Router();

// user registeration route
router.post('/register', RegisterUser);

// user login route
router.post('/login', LoginUser);

module.exports = router;
