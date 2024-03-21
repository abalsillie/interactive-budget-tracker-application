//route handles CRUD operations for Categories
const router = require('express').Router();
const { Categories } = require('../../models/');
//withAuths is custom security authentication middleware enabled by the express.js infrustructure
const withAuth = require('../../utils/auth');

// Route for creating a new category
router.post('/', async (req, res) => {
  try {
      // Create a new category in the database
      const newCategory = await Categories.create({
          ...req.body,
          // omit user_id authentication is not implemented
          // user_id: req.session.user_id,
      });

      // Fetch all categories from the database (without user filtering)
      const categories = await Categories.findAll();

      // Send the updated list of categories as part of the response
      res.status(200).json(categories);
  } catch (err) {
      console.error('Error creating new category:', err);
      res.status(500).json({ message: 'Failed to create new category' });
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

//route forREAD JSON DATA
router.get('/', async (req, res) => {
  try {
      const myCategories = await Categories.findAll(
          // {
          //making sure the categories retrieved are from the user int his user session
          // where: {
          //  user_id: req.session.user_id,
          // },}
          );
      
          res.status(200).json(myCategories);
  }
  catch (err) {
      res.status(500).json({ message: 'Cannot retrieve all categories for user' })
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