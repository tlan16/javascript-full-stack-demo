'use strict';

require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(routes.healthCheck);

module.exports = app;
