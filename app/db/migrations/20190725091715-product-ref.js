'use strict';

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.sequelize.query(` 
    alter table products
      add constraint "products_brands_id_fk"
        foreign key ("brandId") references brands; 
    `);
  },

  down: (queryInterface, _) => {
    return queryInterface.sequelize.query(`
    alter table products
      drop constraint "products_brands_id_fk"; 
    `);
  }
};
