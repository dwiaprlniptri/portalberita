const express = require('express');
const router = express.Router();
const { 
    getAllNews, 
    getNewsBySlug, 
    getNewsById,
    getAllNewsAdmin,
    createNews,
    updateNews,
    deleteNews,
    updateStatus
} = require('../controllers/newsController');
const { user, adminOnly } = require('../middleware/user');

// Public routes
router.get('/', getAllNews);
router.get('/id/:id', getNewsById);

// Protected routes
router.get('/admin/all', user, adminOnly, getAllNewsAdmin);
router.post('/', user, createNews);
router.put('/:id', user, updateNews);
router.delete('/:id', user, deleteNews);
router.put('/:id/status', user, updateStatus);

module.exports = router; 