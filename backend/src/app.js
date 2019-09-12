'use strict';

const express = require('express');

const app = express();
const routes = require('./routes');
app.use(routes.healthCheck);
app.use(routes.customer);

module.exports = app;
