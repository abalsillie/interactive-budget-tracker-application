//index.js manages the routing of all models for our api routes 
//therefore we export each model here

const Categories = require('./Categories');
const Goals = require('./Goals');
const Spends = require('./Spends');
const Weeks = require('./Weeks');
const User = require('./User');


//added a categories_id column to the goals model for storage/link
Categories.hasOne(Goals, { foreignKey: 'categories_id' }); //each category has one goal same each week
Goals.belongsTo(Categories, { foreignKey: 'categories_id' });//goals has a categories_id

//added a categories_id column to the spends model for storage/link
Categories.hasMany(Spends, { foreignKey: 'categories_id' }); //each category has many spends each week
Spends.belongsTo(Categories, { foreignKey: 'categories_id' });//spends has a categories_id

//added a weeks_id column to the spends model for storage/link
Weeks.hasMany(Spends, { foreignKey: 'weeks_id' }); //each week has many spends
Spends.belongsTo(Weeks, { foreignKey: 'weeks_id' });//spends has a weeks_id

//added a user_id column to the categories model for storage/link
User.hasMany(Categories, { foreignKey: 'user_id' }); //each user has many categories
Categories.belongsTo(User, { foreignKey: 'user_id' });//categories has a user_id

//added a user_id column to the spends model for storage/link
User.hasMany(Spends, { foreignKey: 'user_id' }); //each user has many spends
Spends.belongsTo(User, { foreignKey: 'user_id' });//spends has a user_id

//added a user_id column to the weeks model for storage/link
User.hasMany(Weeks, { foreignKey: 'user_id'});  //each user has many weeks
Weeks.belongsTo(User, {foreignKey: 'user_id'});//weeks has a user_id

//Have not added a user -> goals association as goals are attached to each category 
//categories are attached to the user and therefore goals will also be associated with the user via categories

module.exports = {
    Categories,
    Goals,
    Spends,
    Weeks,
    User,
}

//option to remove relationships on weeks and rather sum categories using a sequelize query
//group everything under goals etc and sum totals of categories connected to weeks etc 

