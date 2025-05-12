const User = require('./user');
const Category = require('./category');
const News = require('./news');
const Comment = require('./comment');

// User associations
User.hasMany(News, { foreignKey: 'id_user', as: 'news' });
User.hasMany(Comment, { foreignKey: 'id_user', as: 'comment' });

// Category associations
Category.hasMany(News, { foreignKey: 'id_category', as: 'news' });

// News associations
News.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
News.belongsTo(Category, { foreignKey: 'id_category', as: 'category' });
News.hasMany(Comment, { foreignKey: 'id_news', as: 'comment' });

// Comment associations
Comment.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
Comment.belongsTo(News, { foreignKey: 'id_news', as: 'news' });

module.exports = {
    User,
    Category,
    News,
    Comment
}; 