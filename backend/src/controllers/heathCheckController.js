'use strict';

/**
 *
 * @returns {Object}
 */
function getResponseBody() {
  return {
    'node_version': process.version,
  }
}

/**
 * @param {Object} req
 * @param {Object} res
 */
function controller (req, res) {
  res.send(getResponseBody())
}

module.exports = controller;
