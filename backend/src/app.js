'use strict';

const express = require('express');
const routes = require('./routes');

const app = express();
app.use(routes.healthCheck);
app.use(routes.customer);

module.exports = app;
