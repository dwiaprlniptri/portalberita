const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Comment = require('./comment')

const News = sequelize.define('News', {
    id_news: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('draft', 'published'),
        defaultValue: 'draft'
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_category: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'news',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

News.hasMany(Comment, { foreignKey: 'id_news', as: 'comment' });
Comment.belongsTo(News, { foreignKey: 'id_news', as: 'news' });

module.exports = News; 