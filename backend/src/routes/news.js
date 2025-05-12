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
const { user, adminOnly } = require('../middleware/user');

// Public routes
router.get('/', getAllNews);
router.get('/:slug', getNewsBySlug);

// Protected routes
router.get('/admin/all', user, adminOnly, getAllNewsAdmin);
router.post('/', user, createNews);
router.put('/:id', user, updateNews);
router.delete('/:id', user, deleteNews);

module.exports = router; 