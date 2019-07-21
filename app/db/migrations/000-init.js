const fs = require('fs');
const path = require('path');

class Seq {
  getAttributes() {
    return this.attributes;
  }

  getTable() {
    return this.table;
  }

  define(table, attributes) {
    this.attributes = attributes;
    this.table = table;
    return {};
  }
}

const modelPath = path.join(__dirname, '../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const promise = new Promise(resolve => {
      resolve();
    });

    fs.readdirSync(modelPath).forEach(file => {
      if (path.extname(file) !== '.js') {
        return;
      }
      const model = require(path.join(modelPath, file));
      const sequelize = new Seq();
      model(sequelize, Sequelize);

      promise.then(() =>
        queryInterface.createTable(sequelize.getTable(), sequelize.getAttributes())
      );
    });
    promise.then(() => {
      // queryInterface.sequelize.query(`
      // create index admins_username_index
      // on postgres.public.admins (username) where deleted = false OR deleted is null;
      // `);
      // // TODO: тут добавляем индексы
    });
    return promise;
  }
};
