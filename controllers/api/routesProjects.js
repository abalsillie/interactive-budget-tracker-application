const router = require('express').Router();
const { Projects } = require('../../models');
const withAuths = require('../../utils/auth');

router.post('/', withAuths, async (req, res) => {
    try {
      const newProjects = await Projects.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newProjects);
    } 
    catch (err) {
      res.status(400).json(err);
    }
});

router.delete('/:id', withAuths, async (req, res) => {
    try {
      const projectsData = await Projects.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!projectsData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(projectsData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  
  