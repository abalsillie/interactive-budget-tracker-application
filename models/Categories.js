const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Sequelize Module (ORM) for Categories 
class Categories extends Model { }

Categories.init(
  // Define fields/columns on model
  // model for budget table
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
  },
  {
    // Connection Instance
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'categories'
  }
);

module.exports = Categories;
