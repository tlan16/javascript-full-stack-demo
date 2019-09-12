'use strict';
const mongoose = require('mongoose');

const customerSchema = require('../schemas/customer');

mongoose.model('Customer', customerSchema);


const Customer = mongoose.model('Customer');

module.exports = Customer;
