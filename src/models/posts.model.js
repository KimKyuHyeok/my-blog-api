const sequelize = require('../config/db.js');
const { DataTypes } = require('sequelize');
const SubCategory = require('./sub-category.model.js');

const Posts = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subId: {
        type: DataTypes.INTEGER,
        references: {
            model: SubCategory,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'posts',
    timestamps: true
})

SubCategory.hasMany(Posts, {foreignKey: 'subId'});
Posts.belongsTo(SubCategory, {foreignKey: 'subId'});

module.exports = Posts;