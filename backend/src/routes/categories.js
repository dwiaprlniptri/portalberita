const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategoriesWithStats,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');
const { auth, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/', getAllCategories);

// Admin routes
router.get('/admin/stats', auth, adminOnly, getCategoriesWithStats);
router.post('/', auth, adminOnly, createCategory);
router.put('/:id', auth, adminOnly, updateCategory);
router.delete('/:id', auth, adminOnly, deleteCategory);

module.exports = router; 