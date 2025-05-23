const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const News = require('./news');
const User = require('./user');

const Comment = sequelize.define('Comment', {
    id_comment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_news: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'comment',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Comment; 