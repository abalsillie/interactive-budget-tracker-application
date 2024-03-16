//route handles CRUD operations for Categories

const router = require('express').Router();
const { Categories } = require('../../models/Categories');
//withAuths is custom security authentication middleware enabled by the  express.js infrustructure
const withAuths = require('../../utils/auth');


router.post('/', withAuths, async (req, res) => {
    try {
      const newCategory = await Categories.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newCategory);
    } 
    catch (err) {
      res.status(404).json({ message: 'Error creating new category object!' });
    }
});

router.delete('/:id', withAuths, async (req, res) => {
    try {
      const categoryData = await Categories.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category with this id is found!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  
  