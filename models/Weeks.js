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
      allowNull: false,
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
    start_date: {
      type: DataTypes.DATEONLY, // Use DATEONLY for just the date without time
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY, // Use DATEONLY for just the date without time
      allowNull: false,
    },
    //relationship link to user model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', //name of table
        key: 'id', //linked element
      },
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



