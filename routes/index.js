// Import Express package Router
const express = require('express');
const router = express.Router();

// Imports for Auth0
// const { auth, requiresAuth } = require('express-openid-connect');
// const dotenv = require('dotenv');
// dotenv.config();

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SESSION_SECRET,
//   baseURL: process.env.BASE_URL,
//   clientID: process.env.AUTH0_CLIENT_ID,
//   issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
// };

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
