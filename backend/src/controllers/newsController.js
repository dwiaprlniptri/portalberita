const News = require('../models/news');
const User = require('../models/user');
const Category = require('../models/category');

// Get all published news
exports.getAllNews = async (req, res) => {
    try {
        const news = await News.findAll({
           // where: { status: 'published' },
            include: [
                { model: User, as: 'user', attributes: ['id_user', 'username'] },
                { model: Category, as: 'category', attributes: ['id_category', 'name_category', 'slug'] }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get news by ID
exports.getNewsById = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id, {
            include: [
                { model: User, as: 'user', attributes: ['id_user', 'username'] },
                { model: Category, as: 'category', attributes: ['id_category', 'name_category', 'slug'] }
            ]
        });
        
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all news (admin)
exports.getAllNewsAdmin = async (req, res) => {
    try {
        const news = await News.findAll({
            include: [
                { model: User, as: 'user', attributes: ['id_user', 'username'] },
                { model: Category, as: 'category', attributes: ['id_category', 'name_category', 'slug'] }
            ],
            order: [['created_at', 'DESC']]
        });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create news
exports.createNews = async (req, res) => {
    try {
        const { title, content, id_category, image_url, status } = req.body;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        const news = await News.create({
            title,
            slug,
            content,
            id_category,
            image_url,
            status,
            id_user: req.user.id_user
        });
        
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update news
exports.updateNews = async (req, res) => {
    try {
        const { title, content, id_category, image_url, status } = req.body;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        const news = await News.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        await news.update({
            title,
            slug,
            content,
            id_category,
            image_url,
            status
        });
        
        res.json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete news
exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        await news.destroy();
        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const news = await News.findByPk(id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        await news.update({ status });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 