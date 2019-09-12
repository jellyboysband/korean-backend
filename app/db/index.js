const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { dbConfig } = require('../config');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
);

const dir = path.join(__dirname, '/models');
const db = {
  models: []
};

fs.readdirSync(dir).forEach(file => {
  db.models[path.basename(file, '.js')] = sequelize.import(path.join(dir, file));
});

Object.keys(db.models).forEach(modelName => {
  if (db.models[modelName].associate) {
    db.models[modelName].associate(db.models);
  }
});

db.sequelize = sequelize;

db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

module.exports = db;
