// Import Express package Router
const express = require('express');
const router = express.Router();

// USE request for swagger
router.use('/', require('./swagger'));

// USE request for TREES
router.use('/trees', require('./trees'));

//USE request for SHRUBS
router.use('/shrubs', require('./shrubs'));

//USE request for GRASSES
router.use('/grasses', require('./grasses'));

//USE request for FLOWERS
router.use('/flowers', require('./flowers'));

// Export
module.exports = router;
