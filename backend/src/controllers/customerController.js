'use strict';

const Customer = require('../models/customer');

/**
 * @param {Object} req
 * @param {Object} res
 */
async function create (req, res) {
  try {
    if (await Customer.exists({email: req.body.email})) {
      res.status(409)
        .type('text/markdown')
        .send(`User with email \`${req.body.email}\` already exist.`)
    }

    const customer = new Customer(req.body);
    await customer.save();
    await res.json(customer);
  } catch (err) {
    res.status(422).send(err)
  }
}

async function read(req, res) {
  const {email} = req.params;

  const query = {
    email,
  };
  const customer = await Customer.findOne(query);

  if (!customer) {
    res.status(404)
      .type('text/markdown')
      .send(`Cannot found user with email \`${email}\``);
  } else {
    await res.json(customer);
  }
}

module.exports = {
  create,
  read,
};
