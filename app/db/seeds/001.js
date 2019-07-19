const { table, records } = require('./data/admins');
module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.bulkInsert(table, records, {});
  }
};
