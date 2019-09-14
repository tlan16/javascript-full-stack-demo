'use strict';

const express = require('express');
const heathCheckController = require('../controllers/heathCheckController');
const cors = require('cors');

/**
 * @returns {Router}
 */
function route () {
  const router = express.Router();

  router.options('/', cors());
  router.get('/', cors(), heathCheckController);

  return router;
}

module.exports = route;
