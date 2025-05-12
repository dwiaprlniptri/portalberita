const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser, getAllUsers } = require('../controllers/userController');
const { user: userAuth, adminOnly } = require('../middleware/user');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Get current user
router.get('/me', userAuth, getCurrentUser);

// Get all users (admin only)
router.get('/users',  getAllUsers);

module.exports = router; 