'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const {join} = require('path');
const PORT = 3000;
const DB_HOST=process.env.DB_HOST;
const app = require('./src/app');

// Bootstrap models
const models = join(__dirname, 'src/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => {
    console.log(file);
    require(join(models, file))
  });

// App
function listen() {
  app.listen(PORT);
  console.log(`Express app started on port ${PORT}`);
}

function connect() {
  mongoose.connection
    .on('error', console.error.bind(console, 'Database connection error:'))
    .on('disconnected', connect)
    .once('open', listen);
  return mongoose.connect(DB_HOST, { keepAlive: 1, useNewUrlParser: true });
}

connect();
