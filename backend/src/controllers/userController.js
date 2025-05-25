const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Register new user
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password: bcrypt.hashSync(password, 10) });

        // Generate token setelah user berhasil dibuat
        const token = jwt.sign(
            { id: user.id_user },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Update user dengan token
        await user.update({ token });

        console.log('Token updated:', token);

        res.status(201).json({
            user: {
                id: user.id_user,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }
          

        // Generate new token
        const token = jwt.sign(
            { id: user.id_user },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Update user's token
        await user.update({ token });

        console.log('Token updated:', token);

        res.json({
            user: {
                id: user.id_user,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    res.json({
        id: req.user.id_user,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role
    });
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id_user', 'username', 'email', 'role', 'created_at', 'updated_at'] 
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};