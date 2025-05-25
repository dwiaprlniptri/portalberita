const Comment = require('../models/comment');
const User = require('../models/user');
const News = require('../models/news');

// Get comment for a news
exports.getNewsComment = async (req, res) => {
    try {
        const comment = await Comment.findAll({
            where: { id_news: req.params.newsId },
            include: [
                { model: User, as: 'user', attributes: ['id_user', 'username'] }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create comment
exports.createComment = async (req, res) => {
    try {
        const { id_news, comment } = req.body;
        
        const newComment = await Comment.create({
            id_news,
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

// Get all comments (public or admin)
exports.getAllComment = async (req, res) => {
    try {
        const comment = await Comment.findAll({
            include: [
                { model: User, as: 'user', attributes: ['id_user', 'username'] },
                { model: News, as: 'news', attributes: ['id_news', 'title', 'slug'] }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};