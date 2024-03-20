//route handles CRUD operations for User
const router = require('express').Router();
const { User } = require('../../models');
const withAuths = require('../../utils/auth');


//create new user
router.post('/', async (req, res) => {
    try {
        const usersData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = usersData.id;
            req.session.logged_in = true;
            res.status(200).json(usersData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//log in a user
router.post('/login', async (req, res) => {
    try {
        //finds user
        const usersData = await User.findOne({ where: { email: req.body.email } });
        //handles no user found
        if (!usersData) {
            res
                .status(400)
                .json({ message: 'Try again please, Incorrect Email or Password' });
            return;
        }
        const passwordVal = await usersData.checkPassword(req.body.password);
        //handles invalid password
        if (!passwordVal) {
            res
                .status(400)
                .json({ message: 'Try again please, Incorrect Email or Password' });
            return;
        }
        //saves session to create a new session for this user allowing them to maintain user state across app
        req.session.save(() => {
            req.session.user_id = usersData.id;
            req.session.logged_in = true;
            //success response
            res.json({ user: usersData, message: 'You are logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.delete('/:id', async (req, res) => {
    try {
        // Check if the user deleting the account is the account owner
        if (req.session.user_id !== parseInt(req.params.id)) { //take the route id and compare to the session id
            res.status(403).json({ message: "Your user details do not match. Canot delete accounts" });
            return;
        }
        const userData = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!userData) {
            res.status(404).json({ message: 'No user found' });
            return;
        }
        // Destroy the session after account deletion
        req.session.destroy(() => {
            res.status(200).json({ message: 'Account deleted.' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;