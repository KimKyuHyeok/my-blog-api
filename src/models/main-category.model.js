const sequelize = require('../config/db.js');
const { DataTypes } = require('sequelize');

const MainCategory = sequelize.define('mainCategory', {
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
    tableName: 'mainCategory',
    timestamps: true
})

module.exports = MainCategory;