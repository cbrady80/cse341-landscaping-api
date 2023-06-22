const express = require('express');
const router = express.Router();

const grassController = require('../controllers/grasses');
// const { ensureAuth } = require('../controllers/auth');

router.get('/', grassController.getAllGrass);

router.get('/:heatTolerant', grassController.getGrassByHeatTolerant);

router.get('/:id', grassController.getGrassById);

// router.post('/', ensureAuth, grassController.addGrass);
router.post('/', grassController.addGrass);
// router.put('/:id', ensureAuth, grassController.updateGrass);
router.put('/:id', grassController.updateGrass);
// router.delete('/:id', ensureAuth, grassController.deleteGrass);
router.delete('/:id', grassController.deleteGrass);

module.exports = router;
