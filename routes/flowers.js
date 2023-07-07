const express = require('express');
const router = express.Router();

const flowersController = require('../controllers/flowers');
const authController = require('../controllers/authController');

router.get('/', flowersController.getAllFlowers);

router.get(
  '/sunlight/:sunlight',
  flowersController.getFlowersByLightRequirement
);

router.get('/color/:colors', flowersController.getFlowersByColor);

router.get('/:id', flowersController.getFlowersById);

router.post('/', authController.checkAuth, flowersController.addFlowers);

router.put('/:id', authController.checkAuth, flowersController.updateFlowers);

router.delete('/:id', authController.checkAuth, flowersController.deleteFlowers);

module.exports = router;