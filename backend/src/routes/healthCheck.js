'use strict';

const express = require('express');
const {heathCheckController} = require('../controllers');

/**
 * @returns {Router}
 */
function route () {
  const router = express.Router();
  router.get('/', heathCheckController);

  return router;
}

module.exports = route;
