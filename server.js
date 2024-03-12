const express = require('express');
const sequelize = require('./config/connection');

// Import model to sync table with database

const Budget = require('./models/Spends');
const Categories = require('./models/Categories');
const Goals = require('./models/Goals');
const Weeks = require('./models/Weeks');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync on refresh
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
