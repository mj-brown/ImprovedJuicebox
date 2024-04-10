require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

//Set default port or use the port from the .env file.
const PORT = process.env.PORT || 3000;

// Creates the express server
const app = express();


app.listen(PORT, () => {
    console.log('Server is listening on PORT:', PORT);
  });
