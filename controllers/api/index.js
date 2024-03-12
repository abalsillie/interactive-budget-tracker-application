const router = require('express').Router();
const routesUser = require('./userroutes');
const routesProjects = require('./routesProjects.js');

router.use('/users', routesUser);
router.use('/projects', routesProjects);

module.exports = router;
