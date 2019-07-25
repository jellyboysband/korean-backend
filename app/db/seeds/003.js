const { table, records } = require('./data/products');
module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.bulkInsert(table, records, {});
  }
};
