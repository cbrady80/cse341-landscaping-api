const express = require('express');
const router = express.Router();

const shrubsController = require('../controllers/shrubs');
const authController = require('../controllers/authController');

//Get all shrubs in database
router.get('/', shrubsController.getAllShrubs);
//Get a list of shrubs with a particular light requirement (full sun, part shade)
router.get('/sunlight/:sunlight', shrubsController.getShrubsByLightRequirement);
//Get a specific shrub by id
router.get('/:id', shrubsController.getShrubById);

router.post('/addShrub', authController.checkAuth, shrubsController.addShrub);

router.put('/update/:id', authController.checkAuth, shrubsController.updateShrub);

router.delete('/delete/:id', authController.checkAuth, shrubsController.deleteShrub);

module.exports = router;
