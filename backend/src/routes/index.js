'use strict';

const healthCheck = require('./healthCheck');
const customer = require('./customer');

module.exports = {
  healthCheck: healthCheck(),
  customer: customer(),
};
