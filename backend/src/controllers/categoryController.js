const Category = require('../models/category');
const News = require('../models/news');

// Get all category
exports.getAllCategory = async (req, res) => {
    try {
        const category = await Category.findAll({
            order: [['name_category', 'ASC']]
        });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category with stats (admin)
exports.getCategoryWithStats = async (req, res) => {
    try {
        const category = await Category.findAll({
            include: [{
                model: News,
                as: 'news',
                attributes: ['id_news']
            }],
            order: [['name_category', 'ASC']]
        });

        const categoryWithStats = category.map(category => ({
            ...category.toJSON(),
            newsCount: category.news.length
        }));

        res.json(categoryWithStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create category
exports.createCategory = async (req, res) => {
    try {
        const { name_category } = req.body;
        const slug = name_category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        const category = await Category.create({ name_category, slug });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update category
exports.updateCategory = async (req, res) => {
    try {
        const { name_category } = req.body;
        const slug = name_category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.update({ name_category, slug });
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.destroy();
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 