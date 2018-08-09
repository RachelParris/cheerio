const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(`${process.env.MONGO_URI}`);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/api-routes'));

app.listen(3005, function () {
  console.log('App listening on port: ', 3005);
});
