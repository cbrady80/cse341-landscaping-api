const express = require('express');
const router = express.Router();

const flowersController = require('../controllers/flowers');
// const { ensureAuth } = require('../controllers/auth');

router.get('/', flowersController.getAllFlowers);

router.get('/:sunlight', flowersController.getFlowersByLightRequirement);

router.get('/:colors', flowersController.getFlowersByColor);

router.get('/:id', flowersController.getFlowersById);

// router.post('/', ensureAuth, flowersController.addFlowers);
router.post('/', flowersController.addFlowers);
// router.put('/:id', ensureAuth, flowersController.updateFlowers);
router.put('/:id', flowersController.updateFlowers);
// router.delete('/:id', ensureAuth, flowersController.deleteFlowers);
router.delete('/:id', flowersController.deleteFlowers);

module.exports = router;