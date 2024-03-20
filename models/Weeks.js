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
    // removed as handled by spends/goals
    // total: {
    //   type: DataTypes.DECIMAL(10, 2),
    // },
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
    //hooks are functions that occur before or after calls in sequelize
    //below we are hooks that allow end_date to autofill to 7 days after the start date 
    //start date is user defined for the week on the model
      hooks: {
      beforeCreate: async (week) => {
        const weekEnding = new Date(week.start_date); //using js date object from START date

        weekEnding.setDate(weekStart.getDate() + 7); //set end date 7 days after start date
        week.end_date = weekEnding.toISOString().split('T')[0]; //set syntax to DATEONLY formatting
        //javascript and sequelize handle date objects differently so must be converted back to a string^^
      },
    },
    // Connection Instance
    sequelize,
    timestamps: false, //have opted for manual insertion for week start dates as user might want to set up in advance
    underscored: true,
    modelName: 'weeks'
  }
);

module.exports = Weeks;



