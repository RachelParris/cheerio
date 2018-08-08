const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(`${process.env.MONGO_URI}`);

app.use(require('./routes/api-routes'));

app.listen(3005, function () {
  console.log('App listening on port: ', 3005);
});
