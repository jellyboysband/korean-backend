'use strict';

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.sequelize.query(` 
    create index admins_username_index
    on admins (username) where deleted = false OR deleted is null;


    CREATE UNIQUE INDEX 
    if not exists 
    brands_unique_name 
    ON brands(name) 
    WHERE deleted = false;

    CREATE UNIQUE INDEX 
    if not exists 
    tags_unique_name 
    ON tags(name) 
    WHERE deleted = false;
    `);
  },

  down: (queryInterface, _) => {
    return queryInterface.sequelize.query(` 
    drop index admins_username_index;
    drop index brands_unique_name;
    drop index tags_unique_name;
    `);
  }
};
