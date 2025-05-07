const express = require('express');
const router = express.Router();
const { 
    getAllNews, 
    getNewsBySlug, 
    getAllNewsAdmin,
    createNews,
    updateNews,
    deleteNews
} = require('../controllers/newsController');
const { auth, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/', getAllNews);
router.get('/:slug', getNewsBySlug);

// Protected routes
router.get('/admin/all', auth, adminOnly, getAllNewsAdmin);
router.post('/', auth, createNews);
router.put('/:id', auth, updateNews);
router.delete('/:id', auth, deleteNews);

module.exports = router; 