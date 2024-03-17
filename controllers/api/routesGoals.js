//route handles CRUD operations for Goals

const router = require('express').Router();
const { Goals } = require('../../models');
//withAuths is custom security authentication middleware enabled by the  express.js infrustructure
const withAuths = require('../../utils/auth');

//C- Create route for a new goal
router.post('/', withAuths, async (req, res) => {
  try {
    const newGoal = await Goals.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newGoal);
  }
  catch (err) {
    res.status(404).json({ message: 'Error creating new goal!' });
  }
});

// R- Read route for all goals added together = weekly goal total
router.get('/', withAuths, async (req, res) => {
  try {
    const myWeeklyGoals = await Goals.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('amount')), 'weeklyTotal']
      ],
      raw: true, // This tells Sequelize to return plain results
    });
    let weeklyTotal;
    if (myWeeklyGoals.length === 0) {
      weeklyTotal = 0;
    } else {
      weeklyTotal = myWeeklyGoals[0].weeklyTotal;
    }

    res.status(200).json(weeklyTotal);
  }
  catch (err) {
    res.status(500).json({ message: 'Error fetching your goals!' });
  }

});

// R- Read route for a single goal
router.get('/:id', withAuths, async (req, res) => {
  try {
    //findOne vs. findByPk = findOne can use where: filtering for user_id data
    const oneGoal = await Goals.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!oneGoal) {
      res.status(404).json({ message: 'No goal with this id found' });
      return;
    }
    res.status(200).json(oneGoal);
  }
  catch (err) {
    res.status(500).json({ message: 'Cannot retrieve that particular goal' })
  }
});

// U- update route for single goal amount
router.put('/:id', withAuths, async (req, res) => {
  try {
    //update method returns an array with number of affected rows
    const goalAmount = await Goals.update({
      name: req.body.amount, //field to update
    }, {
      where: {
        id: req.params.id, //correct goal targeted
        user_id: req.session.user_id, //session id matches user
      },
    });

    if (goalAmount[0] === 0) {
      res.status(404).json({ message: 'This goal was not found for this user!' });
      return;
    }

    res.status(200).json({ message: 'Goal amount was updated!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

//D- delete goal
router.delete('/:id', withAuths, async (req, res) => {
  try {
    const goalData = await Goals.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!goalData) {
      res.status(404).json({ message: 'No goal with this id is found!' });
      return;
    }

    res.status(200).json(goalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//D- delete all goal
router.delete('/', withAuths, async (req, res) => {
  try {
    const allGoalData = await Goals.destroy({
      where: {
        user_id: req.session.user_id,
      },
    });

    if (allGoalData === 0) {
      res.status(404).json({ message: 'No goals were found to delete!' });
      return;
    }

    res.status(200).json({ message: `${allGoalData} goals have been deleted.` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

