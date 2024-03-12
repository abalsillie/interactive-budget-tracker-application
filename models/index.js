const Categories = require('./Categories');
const Goals = require('./Goals');
const Spends = require('./Spends');
const Weeks = require('./Weeks');

// Foreign key relationship between budget and categories
Budget.hasMany(Categories, {
  foreignKey: 'categories_id'  
});

// Foreign key relationship between budget and weeks
Budget.hasMany(Weeks, {
    foreignKey: 'weeks_id',  
    onDelete: 'CASCADE',
  });

// We can also define the association starting with License
License.belongsTo(Driver, {
  foreignKey: 'driver_id',
  onDelete: 'CASCADE',
});

// Assuming Category, Budget, and Week models are imported

// If a budget belongs to a category
Budget.belongsTo(Category, { foreignKey: 'category_id' });
// Correspondingly, a category can have many budgets
Category.hasMany(Budget, { foreignKey: 'category_id' });

// If a budget is associated with a week
Budget.belongsTo(Week, { foreignKey: 'week_id' });
// A week can have many budgets
Week.hasMany(Budget, { foreignKey: 'week_id' });

// We package our two models and export them as an object so we can import them together and use their proper names
module.exports = { Driver, License };
