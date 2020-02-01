'use strict';

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.sequelize.transaction(transaction => {
      return queryInterface.sequelize.query(`   
      drop index tags_unique_name; 
    `, { transaction });
    });
  },

  down: (queryInterface, _) => {
    return queryInterface.sequelize.query(`  
    `);
  }
};
