'use strict';

const Customer = require('../models/customer');

/**
 * @param {Object} req
 * @param {Object} res
 */
async function create (req, res) {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    await res.json(customer);
  } catch (err) {
    res.status(422).send(err)
  }
}

module.exports = {
  create,
};
