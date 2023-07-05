const express = require('express');
const router = express.Router();

const grassController = require('../controllers/grasses');
// const checkAuth = require('../controllers/authController');
const checkAuth = (req, res, next) => {
  try{
    if (req.session.token) {
      next();
    }
    else {
      throw new Error("Please log in by going to https://www.landscapingapi.onrender.com/login");
    }
  }
  catch(err) {res.status(500).json({ message: err.message })};
};

router.get('/', grassController.getAllGrass);

router.get('/:id', grassController.getGrassById);

router.get(
  '/heatTolerant/:heatTolerant',
  grassController.getGrassByHeatTolerant
);

router.post('/', checkAuth, grassController.addGrass);

router.put('/:id', checkAuth, grassController.updateGrass);

router.delete('/:id', checkAuth, grassController.deleteGrass);

module.exports = router;