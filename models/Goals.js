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
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    //removed as extraneous for user- actual total will be dynamically calculated in route
    // weekly_total: {
    //   type: DataTypes.DECIMAL(10, 2),
    // },
    //relationship link to categories model
    categories_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories', //name of the table
        key: 'id', //key in the weeks table that weeks_id refers to.
      },
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




