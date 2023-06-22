// Import the dependencies
const express = require('express');
const bodyParser = require('body-parser'); // helps us decode the body from an HTTP request
const morgan = require('morgan');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Instantiate an express object
const app = express();

// Save a port number
const port = process.env.PORT || 6000;

//Logging responses in terminal - handy for dev purposes
app.use(morgan('dev'));

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
  })
  .use('/', require('./routes')); // Calls the routes to view the data

// DATA VALIDATION AND ERROR HANDLING
process.on('uncaughtException', (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});


mongodb.connectToMongo();

app.listen(port);
console.log(`Listening on ${port}`);
