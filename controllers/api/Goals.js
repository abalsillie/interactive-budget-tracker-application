const router = require('express').Router();
const { Goals } = require('../../models/Goals');
const withAuths = require('../../utils/auth');

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
  
  module.exports = router;
  
  