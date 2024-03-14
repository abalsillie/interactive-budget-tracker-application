const express = require('express');
const sequelize = require('./config/connection');

// Import model to sync table with database

const Spends = require('./models/Spends');

const Categories = require('./models/Categories');
const Goals = require('./models/Goals');
const Weeks = require('./models/Weeks');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//'alter' compares models to existing tables and updates accordingly on startup server
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
