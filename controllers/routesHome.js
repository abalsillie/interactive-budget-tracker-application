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

// R- Read route for all categories
router.get('/categories', async (req, res) => {
    try {
      const myCategories = await Categories.findAll({
        //making sure the categories retrieved are from the user int his user session
        where: {
        //   user_id: req.session.user_id,
        user_id: 1,
        },
        include: [{
          model: Goals,
        }]
      });
      res.render('categories', {...myCategories});
    }
    catch (err) {
      res.status(500).json({ message: 'Cannot retrieve all categories for user' })
    }
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


