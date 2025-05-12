const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./src/routes/user');
const newsRoutes = require('./src/routes/news');
const categoryRoutes = require('./src/routes/category');
const commentRoutes = require('./src/routes/comment');
const sequelize = require('./src/config/database'); // <- Tambahkan ini

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/comment', commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

// Connect to DB and run server
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync(); // Sinkronisasi model
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
