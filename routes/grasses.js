const express = require('express');
const router = express.Router();

const grassController = require('../controllers/grasses');
const authController = require('../controllers/authController');

router.get('/', grassController.getAllGrass);

router.get('/:id', grassController.getGrassById);

router.get(
  '/heatTolerant/:heatTolerant',
  grassController.getGrassByHeatTolerant
);

router.post('/', authController.checkAuth, grassController.addGrass);

router.put('/:id', authController.checkAuth, grassController.updateGrass);

router.delete('/:id', authController.checkAuth, grassController.deleteGrass);

module.exports = router;