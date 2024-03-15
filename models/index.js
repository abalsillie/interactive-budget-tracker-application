const Categories = require('./Categories');
const Goals = require('./Goals');
const Spends = require('./Spends');
const Weeks = require('./Weeks');

// Assuming Category, Spends, and Week models are imported

Goals.hasOne(Spends, { foreignKey: 'spends_id' });
Spends.belongsTo(Goals, { foreignKey: 'goals_id' });

Categories.hasMany(Spends, { foreignKey: 'spends_id' });
Spends.belongsTo(Categories, { foreignKey: 'categories_id' });

Categories.hasOne(Goals, { foreignKey: 'goals_id' });
Goals.belongsTo(Categories, { foreignKey: 'categories_id' });

Weeks.hasMany(Spends, { foreignKey: 'spends_id' });
Spends.belongsTo(Weeks, { foreignKey: 'weeks_id' });

Weeks.hasOne(Goals, { foreignKey: 'goals_id' });
Goals.belongsTo(Weeks, { foreignKey: 'weeks_id' });

//option to remove relationships on weeks and rather sum categories using a sequelize query
//group everything under goals etc and sum totals of categories connected to weeks etc 

