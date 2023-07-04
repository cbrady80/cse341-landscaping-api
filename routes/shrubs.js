const express = require('express');
const router = express.Router();

const shrubsController = require('../controllers/shrubs');
const checkAuth = require('../controllers/authController');

//Get all shrubs in database
router.get('/', shrubsController.getAllShrubs);
//Get a list of shrubs with a particular light requirement (full sun, part shade)
router.get('/sunlight/:sunlight', shrubsController.getShrubsByLightRequirement);
//Get a specific shrub by id
router.get('/:id', shrubsController.getShrubById);

router.post('/addShrub', checkAuth.auth, shrubsController.addShrub);

router.put('/update/:id', checkAuth.auth, shrubsController.updateShrub);

router.delete('/delete/:id', checkAuth.auth, shrubsController.deleteShrub);

module.exports = router;
