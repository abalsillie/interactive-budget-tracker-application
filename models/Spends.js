const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Sequelize Module (ORM) for Budget 
class Spends extends Model { }

Spends.init(
  // Define fields/columns on model
  // model for budget table
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    //relationship link to categories model
    categories_id: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'categories', // name of the table
        key: 'id', // key in the 'categories' table that 'categories_id' refers to.
      },
    },
    //relationship link to weeks model
    weeks_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'goals', //name of the table
        key: 'id', //key in the weeks table that weeks_id refers to.
      },
    },
    //relationship link to user model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', //name of user table
        key: 'id', //relative key
      },
    },
  },
  {
    // Connection Instance
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'spends'
  }
);

module.exports = Spends;


