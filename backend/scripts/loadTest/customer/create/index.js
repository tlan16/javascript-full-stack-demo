#!/bin/node

'use strict';

const autocannon = require('autocannon');
const fs = require('fs');
const path = require('path');

const BODY = fs.readFileSync(
  path.join(__dirname, 'requestBody.json'),
  'utf8'
);

function createCustomer() {
  autocannon({
    url: 'http://0.0.0.0:3000/customer',
    connections: 10,
    amount: 100,
    body: BODY,
    idReplacement: true,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }, console.log)
}

createCustomer();
