const express = require('express');
const router = express.Router();

const shrubsController = require('../controllers/shrubs');
// const { ensureAuth } = require('../controllers/auth');

//Get all shrubs in database
router.get('/', shrubsController.getAllShrubs);
//Get a specific shrub by id
router.get('/:id', shrubsController.getShrubById);
//Get a list of shrubs with a particular light requirement (full sun, part shade)
router.get('/:lightRequirement', shrubsController.getShrubsByLightRequirement);

// router.post('/', ensureAuth, shrubsController.addShrub);
router.post('/addShrub', shrubsController.addShrub);
// router.put('/:id', ensureAuth, shrubsController.updateShrub);
router.put('/update/:id', shrubsController.updateShrub);
// router.delete('/:id', ensureAuth, shrubsController.deleteShrub);
router.delete('/delete/:id', shrubsController.deleteShrub);

module.exports = router;
