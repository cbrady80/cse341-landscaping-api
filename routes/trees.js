const express = require('express');
const router = express.Router();

const treesController = require('../controllers/trees');
// const checkAuth = require('../controllers/authController');
const checkAuth = (req, res, next) => {
  try{
    if (req.session.token) {
      next();
    }
    else {
      throw new Error("Please log in by going to https://landscapeproject.onrender.com/login");
    }
  }
  catch(err) {res.status(500).json({ message: err.message })};
};

router.get('/', treesController.getAllTrees);

router.get('/leafType/:leafType', treesController.getTreesByLeafType);

router.get('/:id', treesController.getTreeById);

router.post('/', checkAuth, treesController.addTree);

router.put('/:id', checkAuth, treesController.updateTree);

router.delete('/:id', checkAuth, treesController.deleteTree);

module.exports = router;
