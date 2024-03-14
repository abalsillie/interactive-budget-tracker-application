const router = require('express').Router();
const { Weeks } = require('../../models/Weeks');
const withAuths = require('../../utils/auth');

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
  
  