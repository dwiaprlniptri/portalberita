const User = require('./user');
const Category = require('./category');
const News = require('./news');
const Comment = require('./comment');

// User associations
User.hasMany(News, { foreignKey: 'id_user', as: 'berita' });
User.hasMany(Comment, { foreignKey: 'id_user', as: 'comments' });

// Category associations
Category.hasMany(News, { foreignKey: 'id_kategori', as: 'berita' });

// News associations
News.belongsTo(User, { foreignKey: 'id_user', as: 'author' });
News.belongsTo(Category, { foreignKey: 'id_kategori', as: 'kategori' });
News.hasMany(Comment, { foreignKey: 'id_berita', as: 'comments' });

// Comment associations
Comment.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
Comment.belongsTo(News, { foreignKey: 'id_berita', as: 'berita' });

module.exports = {
    User,
    Category,
    News,
    Comment
}; 