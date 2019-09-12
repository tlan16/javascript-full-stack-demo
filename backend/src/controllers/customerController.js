'use strict';

const Customer = require('../models/customer');

/**
 * @param {Object} req
 * @param {Object} res
 */
function create (req, res) {
  const customer = new Customer(req.body);

  customer.save((err, customer) => {
    res.json(customer)
  })
}

module.exports = {
  create,
};
