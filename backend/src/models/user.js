const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const News = require('./news');
const Comment = require('./comment');

const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    }
}, {
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
        // Tidak hashing password
    }
});

// Bandingkan langsung tanpa bcrypt
User.prototype.checkPassword = async function(password) {
    return password === this.password;
};

User.hasMany(News, { foreignKey: 'id_user', as: 'news' });
News.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

User.hasMany(Comment, { foreignKey: 'id_user', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

module.exports = User;