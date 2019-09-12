'use strict';
const {Schema} = require('mongoose');
const {isEmail} = require('validator');
const AddressSchema = require('./address');

const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
      dropDups: true,
    },
  },
  title: String,
  gender: String,
  dob: Date,
  addresses: [AddressSchema],
});

CustomerSchema.path('email').validate(function(email) {
  return isEmail(email)
}, 'Invalid email.');

CustomerSchema.path('gender').validate(function(gender) {
  return ['male', 'female', 'others', ''].includes(gender)
}, 'Gender must be one of `female`, `male`, `others` or empty string');

module.exports = CustomerSchema;
