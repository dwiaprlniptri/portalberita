const Category = require('../models/category');
const News = require('../models/news');

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            order: [['nama_kategori', 'ASC']]
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get categories with stats (admin)
exports.getCategoriesWithStats = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{
                model: News,
                as: 'berita',
                attributes: ['id_berita']
            }],
            order: [['nama_kategori', 'ASC']]
        });

        const categoriesWithStats = categories.map(category => ({
            ...category.toJSON(),
            newsCount: category.berita.length
        }));

        res.json(categoriesWithStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create category
exports.createCategory = async (req, res) => {
    try {
        const { nama_kategori } = req.body;
        const slug = nama_kategori.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        const category = await Category.create({ nama_kategori, slug });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update category
exports.updateCategory = async (req, res) => {
    try {
        const { nama_kategori } = req.body;
        const slug = nama_kategori.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.update({ nama_kategori, slug });
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