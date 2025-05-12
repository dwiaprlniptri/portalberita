const express = require('express');
const router = express.Router();
const {
    getAllCategory,
    getCategoryWithStats,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');
const { user, adminOnly } = require('../middleware/user');

// Public routes
router.get('/', getAllCategory);

// Admin routes
router.get('/admin/stats', user, adminOnly, getCategoryWithStats);
router.post('/', user, adminOnly, createCategory);
router.put('/:id', user, adminOnly, updateCategory);
router.delete('/:id', user, adminOnly, deleteCategory);

module.exports = router; 