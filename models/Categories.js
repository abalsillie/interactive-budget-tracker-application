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
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    //removed as redundant because goals is its own model
    // amount: {
    //   type: DataTypes.DECIMAL(10, 2),
    //   allowNull: false
    // },
    //relationship link to user who establishes their categories
    user_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'user', //table name
        key: 'id', //table key reference
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

