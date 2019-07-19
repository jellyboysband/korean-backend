'use strict';

const { env } = require('.');

const config = {
  enabled: process.env.LOG_ENABLED || ['production', 'development'].includes(env),
  level: process.env.LOG_LEVEL || (env === 'production' ? 'info' : 'debug'),
  timestamp: true
};

module.exports = config;
