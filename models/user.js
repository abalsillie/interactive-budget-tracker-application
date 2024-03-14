const users = require('.');
const projects = require('./projects');

users.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

projects.belongsTo(users, {
  foreignKey: 'user_id'
});

module.exports = { users, projects };
