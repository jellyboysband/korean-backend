const { table, records } = require('./data/tags');
module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.bulkInsert(table, records, {});
  }
};
