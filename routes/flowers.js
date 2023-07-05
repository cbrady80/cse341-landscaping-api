const express = require('express');
const router = express.Router();

const flowersController = require('../controllers/flowers');
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

router.get('/', flowersController.getAllFlowers);

router.get(
  '/sunlight/:sunlight',
  flowersController.getFlowersByLightRequirement
);

router.get('/color/:colors', flowersController.getFlowersByColor);

router.get('/:id', flowersController.getFlowersById);

router.post('/', checkAuth, flowersController.addFlowers);

router.put('/:id', checkAuth, flowersController.updateFlowers);

router.delete('/:id', checkAuth, flowersController.deleteFlowers);

module.exports = router;
