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
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
      include: 
      [{ model: Categories,}]
      [{ model: Weeks,}]
    });
    if (!oneSpend ) {
      res.status(404).json({ message: 'No spend expense with this id found' });
      return;
    }
    res.status(200).json(oneSpend );
  }
  catch (err) {
    res.status(500).json({ message: 'Cannot retrieve that particular spend expense' })
  }
});

// U- update route for spend
router.put('/:id', async (req, res) => {
  try {
    //update method returns an array with number of affected rows
    const spends = await Spends.update(req.body,
      {
      where: {
        id: req.params.id, //correct category targeted
        user_id: req.session.user_id, //session id matches user
      },
    });

    if (spends[0] === 0) {
      res.status(404).json({ message: 'This spend expense name was not updated for this user!' });
      return;
    }

    res.status(200).json({ message: 'Spend name was updated!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// U- update route for spend's associated category NOTE we are taking info from user request at spendId and categoryId
router.put('/:id', async (req, res) => {
  const {spendId, categoryId} = req.params;

  try {
    //update method returns an array with number of affected rows
    const spendsCategory = await Spends.update({
      categories_id: categoryId,}, //need body from update input to call 'categoryId'
     {  where: {
        id: spendId, //need body from update input to call 'spendId'
        user_id: req.session.user_id, //session id matches user
      },
    });
//returning the updated category on the spend by primary key
    if (spendsCategory[0] > 0) {
      //fetch the updated spend data
      const updatedSpendCategory = await Spends.findByPk(spendId, {
        include: [{ model: Categories}],
      });
      res.status(200).json(updatedSpendCategory);}
      else{
      res.status(404).json({ message: 'This spend category was not updated for this user!' });
      return;
    }

   
  } catch (err) {
    res.status(500).json(err);
  }
});

// D- Delete route for single category w. goal included
router.delete('/:id', async (req, res) => {
  try {
    const spendData = await Categories.destroy({
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
  