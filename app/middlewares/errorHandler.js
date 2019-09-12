'use strict';

const { UNKNOWN_ENDPOINT } = require('../constants/error');

const parseIfValid = obj => {
  try {
    return JSON.parse(obj);
  } catch (err) {
    return false;
  }
};

/**
 * Return middleware that handle exceptions in Koa.
 * Dispose to the first middleware.
 *
 * @return {function} Koa middleware.
 */
function errorHandler() {
  return async (ctx, next) => {
    try {
      await next();

      // Respond 404 Not Found for unhandled request
      if (!ctx.body && (!ctx.status || ctx.status === 404)) {
        ctx.status = 404;
        ctx.body = UNKNOWN_ENDPOINT;
      }
    } catch (err) {
      const errObj = parseIfValid(err.message);
      if (errObj) {
        ctx.status = errObj.code;
        ctx.body = {
          statusCode: ctx.status,
          message: errObj.message
        };
      } else {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
          statusCode: ctx.status,
          message: err.message
        };
      }
    }
  };
}

module.exports = errorHandler;
