const sequelize = require('../config/db.js');
const { DataTypes } = require('sequelize');
const MainCategory = require('./main-category.model.js');

const SubCategory = sequelize.define('subCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mainId: {
        type: DataTypes.INTEGER,
        references: {
            model: MainCategory,
            key: 'id'
        }
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

MainCategory.hasMany(SubCategory, {foreignKey: 'mainId'});
SubCategory.belongsTo(MainCategory, {foreignKey: 'mainId'});

module.exports = SubCategory;