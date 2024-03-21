//index.js manages the routing of all models for our api routes 
//therefore we export each model here

const User = require('./User');
const Categories = require('./Categories');
const Spends = require('./Spends');
const Weeks = require('./Weeks');


//added a categories_id column to the spends model for storage/link
Categories.hasMany(Spends, { foreignKey: 'categories_id' }); //each category has many spends each week
Spends.belongsTo(Categories, { foreignKey: 'categories_id' });//spends has a categories_id

//added a weeks_id column to the categories model for storage/link
Weeks.hasMany(Categories, { foreignKey: 'weeks_id'}); //each week has many categories
Categories.belongsTo(Weeks, { foreignKey: 'weeks_id' });//categories has a weeks_id
//added a weeks_id column to the spends model for storage/link
Weeks.hasMany(Spends, { foreignKey: 'weeks_id', onDelete: 'CASCADE'   }); //each week has many spends
Spends.belongsTo(Weeks, { foreignKey: 'weeks_id' });//spends has a weeks_id


//added a user_id column to the spends model for storage/link
User.hasMany(Spends, { foreignKey: 'user_id', onDelete: 'CASCADE' }); //each user has many spends
Spends.belongsTo(User, { foreignKey: 'user_id' });//spends has a user_id



module.exports = {
    User,
    Categories,
    Spends,
    Weeks,   
};

//option to remove relationships on weeks and rather sum categories using a sequelize query
//group everything under goals etc and sum totals of categories connected to weeks etc 

