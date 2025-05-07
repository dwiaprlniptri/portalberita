const Comment = require('../models/comment');
const User = require('../models/user');
const News = require('../models/news');

// Get comments for a news
exports.getNewsComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { id_berita: req.params.newsId },
            include: [
                { model: User, as: 'user', attributes: ['id_user', 'username'] }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create comment
exports.createComment = async (req, res) => {
    try {
        const { id_berita, comment } = req.body;
        
        const newComment = await Comment.create({
            id_berita,
            id_user: req.user.id_user,
            comment
        });
        
        const commentWithUser = await Comment.findByPk(newComment.id_comment, {
            include: [
                { model: User, as: 'user', attributes: ['id_user', 'username'] }
            ]
        });
        
        res.status(201).json(commentWithUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update comment
exports.updateComment = async (req, res) => {
    try {
        const { comment } = req.body;
        
        const existingComment = await Comment.findByPk(req.params.id);
        if (!existingComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user is the comment owner or admin
        if (existingComment.id_user !== req.user.id_user && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this comment' });
        }

        await existingComment.update({ comment });
        res.json(existingComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete comment
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user is the comment owner or admin
        if (comment.id_user !== req.user.id_user && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        await comment.destroy();
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all comments (admin)
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [
                { model: User, as: 'user', attributes: ['id_user', 'username'] },
                { model: News, as: 'berita', attributes: ['id_berita', 'title', 'slug'] }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 