'use strict';
const { adminSalt } = require('../../config');
const PasswordManager = require('../../utils/PasswordManager');
const passwordManager = new PasswordManager(adminSalt);
module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.sequelize.query(` 

    INSERT INTO admins (id,username, "passwordHash")
    VALUES (1,'admin', '${passwordManager.hash(process.env.ADMIN_PASSWORD)}');


    `);
  },

  down: (queryInterface, _) => {
    return queryInterface.sequelize.query(` 
    
    `);
  }
};
