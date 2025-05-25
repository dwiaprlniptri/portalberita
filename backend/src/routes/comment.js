const express = require('express');
const router = express.Router();
const {
    getNewsComment,
    createComment,
    updateComment,
    deleteComment,
    getAllComment
} = require('../controllers/commentController');

const { user: userAuth, adminOnly } = require('../middleware/user'); 


router.get('/all', getAllComment);
router.get('/:newsId', getNewsComment);


router.post('/', userAuth, createComment);
router.put('/:id', userAuth, updateComment);
router.delete('/:id', userAuth, deleteComment);


// Semua komentar (khusus admin)
router.get('/admin', userAuth, adminOnly, getAllComment);


module.exports = router;