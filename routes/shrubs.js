const express = require('express');
const router = express.Router();

const shrubsController = require('../controllers/shrubs');
const authController = require('../controllers/authController');
// const checkAuth = (req, res, next) => {
//   try{
//     if (req.session.token) {
//       next();
//     }
//     else {
//       throw new Error("Please log in by going to https://landscapeproject.onrender.com/login");
//     }
//   }
//   catch(err) {res.status(500).json({ message: err.message })};
// };

//Get all shrubs in database
router.get('/', shrubsController.getAllShrubs);
//Get a list of shrubs with a particular light requirement (full sun, part shade)
router.get('/sunlight/:sunlight', shrubsController.getShrubsByLightRequirement);
//Get a specific shrub by id
router.get('/:id', shrubsController.getShrubById);

router.post('/addShrub', authController.checkAuth, shrubsController.addShrub);

router.put('/update/:id', authController.checkAuth, shrubsController.updateShrub);

router.delete('/delete/:id', authController.checkAuth, shrubsController.deleteShrub);

module.exports = router;
