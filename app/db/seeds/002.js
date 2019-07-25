const { table, records } = require('./data/brands');
module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.bulkInsert(table, records, {});
  }
};
