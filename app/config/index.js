'use strict';

// Load environment variables from .env file
require('dotenv').config();
// const logger = require('../logger');

const env = process.env.NODE_ENV || 'development';
const configs = {
  base: {
    env,
    name: process.env.APP_NAME || 'active-citizen',
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 7070,
    adminSalt: process.env.ADMIN_SALT,
    adminJwtKey: process.env.ADMIN_JWT_KEY,
    userSalt: process.env.USER_SALT,
    userJwtKey: process.env.USER_JWT_KEY,
    dbConfig: {
      options: {
        host: process.env.DB_HOST || 'localhost',
        port: +process.env.DB_PORT || 5432,
        dialect: process.env.DB_DIALECT || 'postgres',
        pool: {
          max: +process.env.DB_POOL_MAX || 1,
          min: +process.env.DB_POOL_MIN || 1,
          evict: 1000000,
          idle: 1000000
        },

        // eslint-disable-next-line no-console
        logging: process.env.DB_LOGGING === 'true' ? console.log : false
      },
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  },
  production: {
    port: process.env.APP_PORT || 8080
  },
  development: {},
  test: {
    port: 9090
  }
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;
