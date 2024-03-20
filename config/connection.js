//connection.js is our centralized instance of sequelize. 
//all models etc will require sequelize via this connection.js config files 

const Sequelize = require('sequelize');
require('dotenv').config();
console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);


let sequelize;

//JAWSDB is a heroku add-on that allows us to take our db from our local environment
//to the heroku  platform "Rather than going through the hassle of hosting, configuring, 
//patching, and managing a database, JawsDB provides one-click delivery and management 
//of a relational database in the cloud."
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;