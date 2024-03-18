//each model is represented with a route

const router = require('express').Router();
const routesUser = require('./routesUser');
const routesCategories = require('./routesCategories');
const routesSpends = require('./routesSpends');
const routesWeeks = require('./routesWeeks');
const routesGoals = require('./routesGoals');


router.use('/user', routesUser);
router.use('/categories', routesCategories);
router.use('/spends', routesSpends);
router.use('/weeks', routesWeeks);
router.use('/goals', routesGoals);
//this ^^ links to the clientside js use these routes

module.exports = router;


