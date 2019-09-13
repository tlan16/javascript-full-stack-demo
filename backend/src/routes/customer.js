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
  router.put('/customer/:email', customerController.update);

  return router;
}

module.exports = route;
