'use strict';

const healthCheck = require('./healthCheck');

console.log(healthCheck);

module.exports = {
  healthCheck: healthCheck(),
};
