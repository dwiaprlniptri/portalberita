const express = require('express');
const router = express.Router();
const {
    getNewsComments,
    createComment,
    updateComment,
    deleteComment,
    getAllComments
} = require('../controllers/commentController');
const { auth, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/news/:newsId', getNewsComments);

// Protected routes
router.post('/', auth, createComment);
router.put('/:id', auth, updateComment);
router.delete('/:id', auth, deleteComment);

// Admin routes
router.get('/admin/all', auth, adminOnly, getAllComments);

module.exports = router; 