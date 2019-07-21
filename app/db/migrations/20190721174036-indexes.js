'use strict';

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.sequelize.query(` 
    create index admins_username_index
    on admins (username) where deleted = false OR deleted is null;
    `);
  },

  down: (queryInterface, _) => {
    return queryInterface.sequelize.query(` 
    drop index admins_username_index;
    `);
  }
};
