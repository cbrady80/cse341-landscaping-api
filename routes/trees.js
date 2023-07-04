const express = require('express');
const router = express.Router();

const treesController = require('../controllers/trees');
const checkAuth = require('../controllers/authController');

router.get('/', treesController.getAllTrees);

router.get('/leafType/:leafType', treesController.getTreesByLeafType);

router.get('/:id', treesController.getTreeById);

router.post('/', checkAuth.auth, treesController.addTree);

router.put('/:id', checkAuth.auth, treesController.updateTree);

router.delete('/:id', checkAuth.auth, treesController.deleteTree);

module.exports = router;
