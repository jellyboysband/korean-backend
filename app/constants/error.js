'use strict';

/**
 * Client Failures
 */
module.exports.AUTH_REQUIRED = {
  statusCode: 401,
  message: 'Authentication is needed to access the requested endpoint.'
};

module.exports.UNKNOWN_ENDPOINT = {
  statusCode: 404,
  message: 'The requested endpoint does not exist.'
};

module.exports.UNKNOWN_RESOURCE = {
  statusCode: 404,
  message: 'The specified resource was not found.'
};

module.exports.INVALID_REQUEST = {
  statusCode: 423,
  message: 'The request has invalid parameters.'
};

/**
 * Server Errors
 */
module.exports.INTERNAL_ERROR = {
  statusCode: 500,
  message: 'The server encountered an internal error.'
};

module.exports.UNKNOWN_ERROR = {
  statusCode: 500,
  message: 'The server encountered an unknown error.'
};
