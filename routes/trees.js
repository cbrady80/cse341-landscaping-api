const express = require('express');
const router = express.Router();

const treesController = require('../controllers/trees');
const authController = require('../controllers/authController');

router.get('/', treesController.getAllTrees);

router.get('/leafType/:leafType', treesController.getTreesByLeafType);

router.get('/:id', treesController.getTreeById);

router.post('/', authController.checkAuth, treesController.addTree);

router.put('/:id', authController.checkAuth, treesController.updateTree);

router.delete('/:id', authController.checkAuth, treesController.deleteTree);

module.exports = router;
