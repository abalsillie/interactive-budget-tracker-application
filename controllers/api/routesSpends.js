//route handles CRUD operations for Spends

const router = require('express').Router();
const { Spends } = require('../../models');
//withAuths is custom security authentication middleware enabled by the  express.js infrustructure
const withAuths = require('../../utils/auth');

router.post('/', withAuths, async (req, res) => {
    try {
      const newSpends = await Spends.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newSpends);
    } 
    catch (err) {
      res.status(404).json({ message: 'Error creating new Spends!' });
    }
});

router.delete('/:id', withAuths, async (req, res) => {
    try {
      const spendsData = await Spends.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!spendsData) {
        res.status(404).json({ message: 'No spends data with this id is found!' });
        return;
      }
  
      res.status(200).json(spendsData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  
  