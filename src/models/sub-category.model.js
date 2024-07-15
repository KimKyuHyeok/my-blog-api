const sequelize = require('../config/db.js');
const { DataTypes } = require('sequelize');

const SubCategory = sequelize.define('subCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'subCategory',
    timestamps: true
})

module.exports = SubCategory;