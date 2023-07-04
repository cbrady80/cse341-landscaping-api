const express = require('express');
const router = express.Router();

const grassController = require('../controllers/grasses');
const checkAuth = require('../controllers/authController');

router.get('/', grassController.getAllGrass);

router.get('/:id', grassController.getGrassById);

router.get(
  '/heatTolerant/:heatTolerant',
  grassController.getGrassByHeatTolerant
);

router.post('/', checkAuth.auth, grassController.addGrass);

router.put('/:id', checkAuth.auth, grassController.updateGrass);

router.delete('/:id', checkAuth.auth, grassController.deleteGrass);

module.exports = router;