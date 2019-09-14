'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const customerController = require('../controllers/customerController');

/**
 * @returns {Router}
 */
function route () {
  const router = express.Router();
  router.use(bodyParser.json());

  router.options('/customers', cors());
  router.get('/customers', cors(), customerController.index);

  router.options('/customer', cors());
  router.post('/customer', cors(), customerController.create);

  router.options('/customers/:email', cors());
  router.get('/customers/:email', cors(), customerController.read);

  router.options('/customers/:email', cors());
  router.put('/customers/:email', cors(), customerController.update);

  router.options('/customers/:email', cors());
  router.delete('/customers/:email', cors(), customerController.delete);

  return router;
}

module.exports = route;
