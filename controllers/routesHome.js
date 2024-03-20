//everything here responds to ('/')
const router = require('express').Router();
const { Goals, Categories, Spends, User, Weeks } = require('../models');
const withAuths = require('../utils/auth');

//GET

//homepage route homepage will redirect to logged in or not logged in 
router.get('/', async (req, res) => {
    try {
        res.render('homepage', { //express looks for homepage within handlebars
            // passes loggedin state to the template,
            loggedIn: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//this repsonds to the button clicks for login and serves up the login.handelbars
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//route for dashboard
router.get('/dashboard', async (req, res) => {
    try {
        // Your logic to render the dashboard.handlebars file
        res.render('dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

//route for categories
router.get('/categories', async (req, res) => {

    try {
        const myCategories = await Categories.findAll({
            //making sure the categories retrieved are from the user int his user session
            // where: {
            //  user_id: req.session.user_id,
            // },
            include: [{
                model: Goals,
            }]
        });
        res.render('partials/categories', { ...myCategories });
    }
    catch (err) {

        res.status(500).json({ message: 'Cannot retrieve all categories for user' })

    }
});

router.get('/goals', async (req, res) => {
    try {
        const mygoals = await Goals.findAll({
            where: {
                user_id: req.session.user_id, // Assuming user ID is stored in session
            },
            include: [{
                model: Goals,
            }]
        });
        res.render('partials/goals', { mygoals }); // Pass mygoals directly to the template
    }
    catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Cannot retrieve all goals for user' });
    }
});
// R- Read route for all weeks w spends and categories/goals included
//weeks route also pulls in categories and goals
router.get('/weeks', async (req, res) => {
    try {
        const myWeeks = await Weeks.findAll({
            //making sure the categories retrieved are from the user int his user session
            // where: {
            //     user_id: req.session.user_id,
            // },
            include: [
                {
                    model: Categories,
                    include: [Goals]
                },
                { model: Spends },
            ]
        });
        res.render('partials/weeks', { ...myWeeks });
    }
    catch (err) {
        res.status(500).json({ message: 'Cannot retrieve all weeks for user' })
    }
});
//spends also pulls in categories and weeks data
// R- Read route for a all spends brings in assigned categories and weeks also
router.get('/spends', async (req, res) => {
    try {
        const allSpends = await Spends.findAll({
            // where: {
            //     id: req.params.id,
            //     user_id: req.session.user_id,
            // },
            include:
                [{ model: Categories, }]
                [{ model: Weeks, }]
        });
        res.render('partials/spends', ...allSpends);
    }
    catch (err) {
        res.status(500).json({ message: 'Cannot retrieve your spend expenses' })
    }
});
//POST
router.post('/login', async (req, res) => {
    try {
      
        res.redirect('/homepage');
    } catch (err) {
        // Handle login errors
        res.status(500).json({ message: 'Error occurred during login' });
    }
});


//restful api = post associated with changes
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req, session.destroy(() => {
            res.redirect('/login');
        });
        return;
    }
});

module.exports = router;