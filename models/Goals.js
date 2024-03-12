const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Sequelize Module (ORM) for Goals
class Goals extends Model { }

Goals.init(
  // Define fields/columns on model
  // model for budget table
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    weekly_total: {
      type: DataTypes.DECIMAL(10, 2),
    },
    category_amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    // Connection Instance
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'goals'
  }
);

module.exports = Goals;




