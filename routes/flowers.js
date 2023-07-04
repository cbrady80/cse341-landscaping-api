const express = require('express');
const router = express.Router();

const flowersController = require('../controllers/flowers');
const checkAuth = require('../controllers/authController');

router.get('/', flowersController.getAllFlowers);

router.get(
  '/sunlight/:sunlight',
  flowersController.getFlowersByLightRequirement
);

router.get('/color/:colors', flowersController.getFlowersByColor);

router.get('/:id', flowersController.getFlowersById);

router.post('/', checkAuth.auth, flowersController.addFlowers);

router.put('/:id', checkAuth.auth, flowersController.updateFlowers);

router.delete('/:id', checkAuth.auth, flowersController.deleteFlowers);

module.exports = router;
