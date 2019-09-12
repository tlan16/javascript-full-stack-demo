'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const customerController = require('../controllers/customerController');

/**
 * @returns {Router}
 */
function route () {
  const router = express.Router();
  router.use(bodyParser.json());
  router.post('/customer', customerController.create);
  router.get('/customer/:email', customerController.read);

  return router;
}

module.exports = route;
