//route handles CRUD operations for User

const router = require('express').Router();
const { User } = require('../../models');

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

router.post('/login', async (req, res) => {
    try {
        const usersData = await User.findOne({ where: { email: req.body.email } });

        if (!usersData) {
            res
                .status(400)
                .json({ message: 'Try again please, Incorrect Email or Password' });
            return;
        }
        const passwordVal = await usersData.checkPassword(req.body.password);

        if (!passwordVal) {
            res
                .status(400)
                .json({ message: 'Try again please, Incorrect Email or Password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = usersData.id;
            req.session.logged_in = true;

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

module.exports = router;
