const { env, dbConfig } = require('./app/config');

module.exports[env] = {
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.options.host,
  port: dbConfig.options.port,
  dialect: dbConfig.options.dialect,
  logging: console.log
};
