//route handles CRUD operations for Weeks

const router = require('express').Router();
const { Goals, Categories } = require('../../models');
const { Weeks } = require('../../models/Weeks');
//withAuths is custom security authentication middleware enabled by the  express.js infrustructure
const withAuths = require('../../utils/auth');

// C- Create route for a new week
router.post('/', withAuths, async (req, res) => {
    try {
      const newWeek = await Weeks.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newWeek);
    } 
    catch (err) {
      res.status(404).json({ message: 'Error creating a new week!' });
    }
});

// R- Read route for all weeks w spends and categories/goals included
router.get('/', withAuths, async (req, res) => {
  try {
    const myWeeks = await Weeks.findAll({
      //making sure the categories retrieved are from the user int his user session
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {model: Categories,
          include: [Goals]}, 
        {model: Spends}, 
      ]
    });
    res.status(200).json(myWeeks);
  }
  catch (err) {
    res.status(500).json({ message: 'Cannot retrieve all weeks for user' })
  }
});

// R- Read route for a single week with w spends and categories/goals included
router.get('/:id', withAuths, async (req, res) => {
  try {
    //findOne vs. findByPk = findOne can use 'where:' filtering for user_id data directly at the where: rather than feeding params in
    const oneWeek = await Weeks.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
      include: [
        {model: Categories,
        include: [Goals]},
        {model: Spends},
      ]
    });
    if (!oneWeek) {
      res.status(404).json({ message: 'No week with this id found' });
      return;
    }
    res.status(200).json(oneWeek);
  }
  catch (err) {
    res.status(500).json({ message: 'Cannot retrieve that particular week' })
  }
});

// U- update route for single week name
router.put('/:id', withAuths, async (req, res) => {
  try {
    //update method returns an array with number of affected rows
    const weekName = await Weeks.update({
      name: req.body.name, //field to update
    }, {
      where: {
        id: req.params.id, //correct category targeted
        user_id: req.session.user_id, //session id matches user
      },
    });

    if (weekName[0] === 0) {
      res.status(404).json({ message: 'This week was not updated for this user!' });
      return;
    }

    res.status(200).json({ message: 'Week name was updated!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

//D- delete week
router.delete('/:id', withAuths, async (req, res) => {
    try {
      const weekData = await Weeks.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!weekData) {
        res.status(404).json({ message: 'No week with this id is found!' });
        return;
      }
  
      res.status(200).json(weekData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  
  