'use strict';

const {Schema} = require('mongoose');
const {isISO31661Alpha3} = require('validator');

const AddressSchema = new Schema({
  company: String,
  contactName: String,
  street1: {
    type: String,
    required: true,
  },
  street2: String,
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  telephone: String,
  fax: String,
  addressType: {
    type: String,
    required: true,
  },
});

AddressSchema.path('addressType').validate(function(gender) {
  return ['billing', 'shipping', ''].includes(gender)
}, 'Gender must be one of `billing`, `shipping` or empty string');

AddressSchema.path('country').validate(function(country) {
  return isISO31661Alpha3(country)
}, 'Country code must comply with ISO 3166-1 alpha-3.');

module.exports = AddressSchema;
