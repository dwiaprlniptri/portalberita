const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const News = require('./news');


const Category = sequelize.define('Category', {
    id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_category: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'category',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Category.hasMany(News, { foreignKey: 'id_category', as: 'news' });
News.belongsTo(Category, { foreignKey: 'id_category', as: 'category' });

module.exports = Category; 