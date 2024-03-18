//route handles CRUD operations for Weeks

const router = require('express').Router();
const { Goals, Categories, Weeks } = require('../../models');
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

// R- Read route for a single week with w spends and categories/goals included
router.get('/:id', withAuths, async (req, res) => {
  try {
    //findOne vs. findByPk = findOne can use 'where:' filtering for user_id data directly at the where: rather than feeding params in
    const oneWeek = await Weeks.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
      include: 
      [{ model: Categories, include: [Goals] },
      { model: Spends },
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

// U- update route for single week name (all)
router.put('/:id', withAuths, async (req, res) => {
  try {
    //update method returns an array with number of affected rows
    const weekName = await Weeks.update(req.body, {
      where: {
        id: req.params.id, //correct category targeted
        user_id: req.session.user_id, //session id matches user
      },
    });

    if (weekName[0] === 0) {
      res.status(404).json({ message: 'This week name was not updated for this user!' });
      return;
    }

    res.status(200).json({ message: 'Week name was updated!' });
  } catch (err) {
    res.status(500).json(err);
  }

  
});

// U- update route for single week start date and autofill end date 7 days after
router.put('/:id', withAuths, async (req, res) => {
  try {

    //same as beforeCreate hook on the Weeks model for autofill on end_date
    const weekStart = new Date(req.body.start_date); //using js date object js can read SQL date format
    const weekEnding = new Date(req.body.end_date); //using js date object js can read SQL date format
    weekEnding.setDate(weekStart.getDate() +7); //set end date 7 days after start date
    const formatWeekEnding = weekEnding.toISOString().split('T')[0]; //set syntax to DATEONLY formatting

    //update method returns an array with number of affected rows
    const weekStartDate = await Weeks.update({
      start_date: req.body.start_date, //field to update: coming from user input req.body
      end_date: formatWeekEnding, //field to update: with auto calculations
    }, {
      where: {
        id: req.params.id, //correct category targeted
        user_id: req.session.user_id, //session id matches user
      },
    });

    if (weekStartDate[0] === 0) {
      res.status(404).json({ message: 'This week start date was not updated for this user!' });
      return;
    }

    res.status(200).json({ message: 'Week start date was updated!' });
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

//have not included DELETE ALL WEEKS functon as deleting a week cascades all spends to be deleted
//this could cause a user error that woudl mean all data is lost 

module.exports = router;

