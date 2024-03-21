//route handles CRUD operations for Spends
const router = require('express').Router();
const { Spends, Categories, Weeks } = require('../../models');
//withAuths is custom security authentication middleware enabled by the  express.js infrustructure
const withAuths = require('../../utils/auth');
// C- Create route for a new Spend
router.post('/', async (req, res) => {
  try {
    const newSpend = await Spends.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newSpend);
  }
  catch (err) {
    res.status(404).json({ message: 'Error creating new spend expense object!' });
  }
});

// R- Read route for a single spends with ist assigned category and assigned week
router.get('/:id', async (req, res) => {
  try {
    //findOne vs. findByPk = findOne can use where: filtering for user_id data
    const oneSpend = await Spends.findOne({
      // where: {
      //   id: req.params.id,
      //   user_id: req.session.user_id,
      // },
     // Correct
include: [
  { model: Categories },
  { model: Weeks }
]

    });
    if (!oneSpend) {
      res.status(404).json({ message: 'No spend expense with this id found' });
      return;
    }
    res.status(200).json(oneSpend);
  }
  catch (err) {
    res.status(500).json({ message: 'Cannot retrieve that particular spend expense' })
  }
});

// U- update route for spend
router.put('/:id', async (req, res) => {
  const { categoryId, ...spendDetails } = req.body; // Assuming you're passing the updated spend details and optionally a new category ID
  const spendId = req.params.id;

  try {
    // Update the spend details
    const updatedSpendResult = await Spends.update(spendDetails, {
      where: {
        id: spendId,
        user_id: req.session.user_id, // Ensuring the user owns the spend
      },
    });

    if (updatedSpendResult[0] === 0) {
      return res.status(404).json({ message: 'This spend was not updated for this user!' });
    }

    // Optionally update the spend's category if a new category ID was provided
    if (categoryId) {
      const updatedCategoryResult = await Spends.update({ categories_id: categoryId }, {
        where: {
          id: spendId,
          user_id: req.session.user_id,
        },
      });

      if (updatedCategoryResult[0] === 0) {
        // This checks if the category update failed, but it's more of a precaution
        // since the previous check should ensure the spend exists and belongs to the user
        return res.status(404).json({ message: 'This spend category was not updated for this user!' });
      }
    }

    // Fetch and return the updated spend data including associated category
    const updatedSpend = await Spends.findByPk(spendId, {
      include: [{ model: Categories }],
    });

    res.status(200).json(updatedSpend);
  } catch (err) {
    res.status(500).json({ message: err.message || 'An error occurred while updating the spend.' });
  }
});


// D- Delete route for single category w. goal included
router.delete('/:id?', async (req, res) => {
  try {
    // Check if an ID is provided for deleting a specific spend
    if (req.params.id) {
      const spendId = req.params.id;
      const deletedSpend = await Spends.destroy({
        where: {
          id: spendId,
          // user_id: req.session.user_id, // Ensuring the user owns the spend or has the right to delete it
        },
      });

      if (deletedSpend === 0) {
        return res.status(404).json({ message: 'No spend with this id found!' });
      }

      return res.status(200).json({ message: 'Spend deleted successfully.' });
    } else {
      // No ID provided, proceed to delete all spends for the user
      const deletedSpendsCount = await Spends.destroy({
        where: {
          user_id: req.session.user_id, // Make sure to filter by user_id to only delete the user's spends
        },
      });

      if (deletedSpendsCount === 0) {
        return res.status(404).json({ message: 'No spends found for deletion!' });
      }

      return res.status(200).json({ message: `${deletedSpendsCount} spends have been deleted.` });
    }
  } catch (err) {
    return res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
});

module.exports = router;