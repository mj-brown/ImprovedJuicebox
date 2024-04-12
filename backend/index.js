require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const apiRouter = require('./api');

//Set default port or use the port from the .env file.
const PORT = process.env.PORT || 3000;

// Creates the express server
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(morgan('dev'));

// Connecting to the database client
const client = require('./db/index');
client.connect();

// Route handling
app.use('/api', apiRouter);

// Start server
app.listen(PORT, () => {
    console.log('Server is listening on PORT:', PORT);
});
