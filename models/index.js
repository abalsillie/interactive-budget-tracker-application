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



