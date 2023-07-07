// Import the dependencies
const express = require('express');
const bodyParser = require('body-parser'); // helps us decode the body from an HTTP request
const morgan = require('morgan');
const mongodb = require('./db/connect');

// Instantiate an express object
const app = express();
// Save a port number
const port = process.env.PORT || 8000;
//For authorizing users:
const session = require('express-session');
const axios = require('axios');

//Logging responses in terminal - handy for dev purposes
// app.use(morgan('dev'));

app.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  }))

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes')) // Calls the routes to view the data
  // DATA VALIDATION AND ERROR HANDLING
  process.on('uncaughtException', (err, origin) => {
    console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

//Users must be logged in to change database:
app.get('/login', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`
  )
})
app.get('/callback', (req, res) => {
  const { code } = req.query;
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  }
  const opts = {
    headers: { accept: 'application/json' }
  }
  axios.post('https://github.com/login/oauth/access_token', body, opts)
    .then((res2) => {
      req.session.token = res2.data.access_token;
      res.redirect('/api-docs')
    })
    .catch((err) => res.status(500).json({ message: err.message }))
})
//So users can logout:
app.get('/logout', (req, res) => {
  req.session.token = null;
  res.redirect('/api-docs')
})

mongodb.connectToMongo();

module.exports = app.listen(port);
console.log(`Listening on ${port}`);