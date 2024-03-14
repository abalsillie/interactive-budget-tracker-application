const Categories = require('./Categories');
const Goals = require('./Goals');
const Spends = require('./Spends');
const Weeks = require('./Weeks');

// Assuming Category, Spends, and Week models are imported

Goals.hasMany(Spends, { foreignKey: 'spends_id' });

Categories.hasMany(Spends, { foreignKey: 'spends_id' });
Categories.hasMany(Goals, { foreignKey: 'goals_id' });

Weeks.hasMany(Spends, { foreignKey: 'spends_id' });
Weeks.hasMany(Goals, { foreignKey: 'goals_id' });

// We package our two models and export them as an object so we can import them together and use their proper names
module.exports = { Driver, License };


// sequelize sum query for totals (controllers)


