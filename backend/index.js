const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
require('dotenv').config();

// Import models
require('./src/models');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({
            status: 'ok',
            database: 'connected',
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            database: 'disconnected',
            error: error.message
        });
    }
});

// Routes
app.use('/auth', require('./src/routes/auth'));
app.use('/categories', require('./src/routes/categories'));
app.use('/news', require('./src/routes/news'));
app.use('/comments', require('./src/routes/comments'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized successfully');
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Unable to start server:', error);
    }
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
        server.close();
        app.listen(PORT + 1, async () => {
            try {
                await sequelize.sync();
                console.log('Database synchronized successfully');
                console.log(`Server is running on port ${PORT + 1}`);
            } catch (error) {
                console.error('Unable to start server:', error);
            }
        });
    } else {
        console.error('Server error:', err);
    }
});