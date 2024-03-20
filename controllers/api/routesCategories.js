//route handles CRUD operations for Categories

const router = require('express').Router();
const { Categories } = require('../../models/');
//withAuths is custom security authentication middleware enabled by the express.js infrustructure
const withAuths = require('../../utils/auth');

// C- Create route for a new category 
router.post('/', async (req, res) => {
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

// R- Read route for a single category with goal incl.
router.get('/:id', async (req, res) => {
  try {
    //findOne vs. findByPk = findOne can use where: filtering for user_id data
    const oneCategory = await Categories.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
      include: [{
        model: Goals,
      }]
    });
    if (!oneCategory) {
      res.status(404).json({ message: 'No category with this id found' });
      return;
    }
    res.status(200).json(oneCategory);
  }
  catch (err) {
    res.status(500).json({ message: 'Cannot retrieve that particular category' })
  }
});

// U- update route for single category name
router.put('/:id', async (req, res) => {
  try {
    //update method returns an array with number of affected rows
    const categoryName = await Categories.update(req.body
      // {
    //   name: req.body.name, //field to update
    // }
    , {
      where: {
        id: req.params.id, //correct category targeted
        user_id: req.session.user_id, //session id matches user
      },
    });

    if (categoryName[0] === 0) {
      res.status(404).json({ message: 'This category was not updated for this user!' });
      return;
    }

    res.status(200).json({ message: 'Category name was updated!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// D- Delete route for single category w. goal included
router.delete('/:id', async (req, res) => {
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

// D- Delete route for all categories
router.delete('/', async (req, res) => {
  try {
    const allCategoryData = await Categories.destroy({
      where: {
        user_id: req.session.user_id
      },
    });

    if (allCategoryData === 0) {
      res.status(404).json({ message: 'No categories found for deletion!' });
      return;
    }
    //destroy returns a count of items destroyed so here we are adding in the count of deleted items
    res.status(200).json({ message: `${allCategoryData} categories have been deleted.` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

