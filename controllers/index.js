//this is the entry oint for all route handling in theis application
// ('/') directs to routesHome
// ('/api') directs to all api folder files which begins with the index.js within that folder 

const router = require('express').Router();

const apiRoutes = require('./api');
const routesHome = require('./routesHome');

router.use('/', routesHome);
router.use('/api', apiRoutes);

module.exports = router;
