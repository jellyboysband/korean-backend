'use strict';

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.sequelize.transaction(transaction => {
      return queryInterface.sequelize.query(`   
      alter table tags rename to categories;

      alter table categories
      add "parentId" int;
    
      alter table categories
      add constraint categories_categories_id_fk
        foreign key ("parentId") references categories;
 

      alter table "tagProduct" rename to "categoryProduct";

      alter table "categoryProduct" rename column "tagId" to "categoryId";


    `, { transaction });
    });
  },

  down: (queryInterface, _) => {
    return queryInterface.sequelize.query(`  
    `);
  }
};
