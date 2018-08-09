const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api-routes');
const app = express();
require('dotenv').config();


// Setup mongoose
mongoose.Promise = global.Promise;
mongoose.connect(`${process.env.MONGO_URI}`);

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Use API routes
app.use('/api', apiRoutes);

// Listen to server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
