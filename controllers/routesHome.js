//everything here responds to ('/')

const router = require('express').Router();
const { Goals, Categories, Spends, User, Weeks } = require('../models');
const withAuths = require('../utils/auth');

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


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

    //restful api = post associated with changes
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req,session.destroy(() => {
            res.redirect('/login');   
        });
        
        return;
    }});

module.exports = router;


