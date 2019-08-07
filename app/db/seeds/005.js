const { table, records } = require('./data/tagProduct');
module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.bulkInsert(table, records, {});
  }
};
