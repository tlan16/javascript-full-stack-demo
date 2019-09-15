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

async function index(req, res) {
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const size = req.query.size > 0 ? parseInt(req.query.size) : 15;
  const search = String(req.query.search).length > 0 ? req.query.search : undefined;

  if (size > 100) {
    res.status(404)
      .type('text/markdown')
      .send('Pagination size cannot exceed 100');
  }

  const query = search ? Customer.fuzzySearch(search) : Customer.find();
  query.sort({'firstName': 'ascending'})
    .limit(size)
    .skip(size*page);

  const [
    customers,
    totalCustomerCount,
  ] = await Promise.all([
    query.exec(),
    Customer.countDocuments(),
  ]);

  await res.json({
    data: customers,
    page: page + 1,
    size: size,
    totalCount: totalCustomerCount,
    totalPages: Math.ceil(totalCustomerCount / size),
  })
}

module.exports = {
  create,
  read,
  update,
  delete: remove,
  index,
};
