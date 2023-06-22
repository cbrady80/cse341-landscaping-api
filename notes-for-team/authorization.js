// On my last assignment, this is how the TA walked me through OAuth.
// My main app.js file looked like this:

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();
const session = require('express-session');
const axios = require('axios');
app.use(session({
  secret: process.env.GITHUB_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true
}))

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'))
  process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });
app.get('/login', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&prompt=consent`)
})
//That last part &prompt=consent is what helps when someone logs
// out and then logs back in again so that it will prompt for authorization
// again even if they are still signed in to Github somewhere.
app.get('/callback', (req, res) => {
  const {code} = req.query;
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  }
  const opts = {
    headers: {accept: 'application/json'}
  }
  axios.post('https://github.com/login/oauth/access_token', body, opts)
  .then((res2) => {
    req.session.token = res2.data.access_token;
    res.redirect('/api-docs')
  })
  .catch(err => res.status(500).json({ message: err.message }))
})
app.get('/logout', (req, res) => {
  req.session.token = null;
  res.redirect('/api-docs')
})

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

//And then, in my specific route file that included protected routes, 
//it looked like this:
const express = require('express');
const router = express.Router();

const choreAssignmentsController = require('../controllers/choreAssignments');
const validator = require('../middleware/validate');
const checkAuth = (req, res, next) => {
  try{
    if (req.session.token) {
      next();
    }
    else {
      throw new Error("Please log in.");
    }
  }
  catch(err) {res.status(500).json({ message: err.message })};
}

router.get('/', choreAssignmentsController.getChoreAssignments);
router.get('/:id', choreAssignmentsController.getOneChildAssignment);
router.post('/add', checkAuth, validator.saveAssignment, choreAssignmentsController.addChoreAssignment);
router.put('/edit/:id', checkAuth, validator.saveAssignment, choreAssignmentsController.editChoreAssignment);
router.delete('/delete/:id', checkAuth, choreAssignmentsController.deleteChoreAssignment);

module.exports = router;

// And of course I had to add the Github Client Id and Client Secret
// to my .env file