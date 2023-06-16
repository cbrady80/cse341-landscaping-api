const express = require('express');
const router = express.Router();

const treesController = require('../controllers/trees');
// const { ensureAuth } = require('../controllers/auth');

router.get('/', treesController.getAllTrees);

router.get('/:leafType', treesController.getTreesByLeafType);

router.get('/:id', treesController.getTreeById);

// router.post('/', ensureAuth, treesController.addTree);
router.post('/', treesController.addTree);
// router.put('/:id', ensureAuth, treesController.updateTree);
router.put('/:id', treesController.updateTree);
// router.delete('/:id', ensureAuth, treesController.deleteTree);
router.delete('/:id', treesController.deleteTree);

module.exports = router;
