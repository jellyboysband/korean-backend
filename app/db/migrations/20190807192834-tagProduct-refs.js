'use strict';

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.sequelize.query(` 
    alter table "tagProduct"
    add constraint "tagProduct_tags_id_fk"
      foreign key ("tagId") references tags;

    alter table "tagProduct"
      add constraint "tagProduct_products_id_fk"
        foreign key ("productId") references products;
      
    `);
  },

  down: (queryInterface, _) => {
    return queryInterface.sequelize.query(`
    alter table "tagProduct" drop constraint "tagProduct_tags_id_fk";

    alter table "tagProduct" drop constraint "tagProduct_products_id_fk";
    
    `);
  }
};
