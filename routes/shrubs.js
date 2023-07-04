const express = require('express');
const router = express.Router();

const shrubsController = require('../controllers/shrubs');
// const checkAuth = require('../controllers/authController');
const checkAuth = (req, res, next) => {
  try{
    if (req.session.token) {
      next();
    }
    else {
      throw new Error("Please log in.");
    }
  }
  catch(err) {res.status(500).json({ message: err.message })};
}

//Get all shrubs in database
router.get('/', shrubsController.getAllShrubs);
//Get a list of shrubs with a particular light requirement (full sun, part shade)
router.get('/sunlight/:sunlight', shrubsController.getShrubsByLightRequirement);
//Get a specific shrub by id
router.get('/:id', shrubsController.getShrubById);

router.post('/addShrub', checkAuth, shrubsController.addShrub);

router.put('/update/:id', checkAuth, shrubsController.updateShrub);

router.delete('/delete/:id', checkAuth, shrubsController.deleteShrub);

module.exports = router;
