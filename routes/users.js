const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const authController = require('../controllers/authController');
// const { ensureAuth } = require('../controllers/auth');

// router.get('/', ensureAuth, usersController.getAllUsers);
router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUserById);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;

module.exports = router;
