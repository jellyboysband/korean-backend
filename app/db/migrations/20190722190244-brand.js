'use strict';

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.sequelize.query(` 
    CREATE UNIQUE INDEX
    if not exists
    brands_unique_name
    ON brands(name)
    WHERE deleted = false
    `);
  },

  down: (queryInterface, _) => {
    return queryInterface.sequelize.query(` 
    drop index brands_unique_name;
    `);
  }
};
