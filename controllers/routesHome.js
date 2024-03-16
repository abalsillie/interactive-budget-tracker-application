const router = require('express').Router();
const { Project, Users } = require('../models');
const withAuths = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const projectsData = await Project.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['name'],
                },
            ],
        });

        const projects = projectsData.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            projects,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/project/:id', async (req, res) => {
    try {
        const projectData = await Project.findByPk(req.params.id, {
            include: [
                {
                    model: Users,
                    attributes: ['name'],
                },
            ],
        });

        const project = projectData.get({ plain: true });

        res.render('project', {
            ...project,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuths, async (req, res) => {
    try {
        const userDatas = await Users.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project }],
        });

        const users = userDatas.get({ plain: true });

        res.render('profile', {
            ...users,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;


