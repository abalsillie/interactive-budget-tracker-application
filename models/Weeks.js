const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Sequelize Module (ORM) for Categories 
class Weeks extends Model { }

Weeks.init(
  // Define fields/columns on model
  // model for budget table
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    // Connection Instance
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'weeks'
  }
);

module.exports = Weeks;



