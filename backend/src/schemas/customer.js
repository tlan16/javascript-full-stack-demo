'use strict';
const {Schema} = require('mongoose');
const {isEmail} = require('validator');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const AddressSchema = require('./address');

const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    index: true,
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
  gender: {
    type: String,
    index: true,
  },
  dob: {
    type: Date,
    index: true,
  },
  addresses: [AddressSchema],
});

CustomerSchema.plugin(mongoose_fuzzy_searching, {
  fields: [
    'firstName',
    'lastName',
    'email',
  ],
}, { autoIndex: false });

CustomerSchema.path('email').validate(function(email) {
  return isEmail(email)
}, 'Invalid email.');

CustomerSchema.path('gender').validate(function(gender) {
  return ['male', 'female', 'others', ''].includes(gender)
}, 'Gender must be one of `female`, `male`, `others` or empty string');

module.exports = CustomerSchema;
