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
        .send(`User with email \`${req.body.email}\` already exist.`);
      return;
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

    return;
  }

  await res.json(customer);
}

async function update(req, res) {
  try {
    const {email} = req.params;

    const query = {
      email,
    };

    const customer = await Customer.findOne(query);
    if (!customer) {
      res.status(404)
        .type('text/markdown')
        .send(`User with email \`${req.body.email}\` does not exist.`);
      return;
    }

    const updatedCustomer = new Customer(req.body);
    await updatedCustomer.validate();

    const options = {new : true, runValidators: true };
    await Customer.updateOne({query}, updatedCustomer, options);

    await res.json(updatedCustomer);
  } catch (err) {
    res.status(422).send(err)
  }
}


async function remove(req, res) {
  try {
    const {email} = req.params;

    const query = {
      email,
    };

    if (! await Customer.exists(query)) {
      res.status(404)
        .type('text/markdown')
        .send(`Cannot found user with email \`${email}\``);

      return;
    }

    await Customer.deleteOne(query);
    await res.status(204).send();
  } catch (err) {
    res.status(422).send(err)
  }
}

module.exports = {
  create,
  read,
  update,
  delete: remove,
};
