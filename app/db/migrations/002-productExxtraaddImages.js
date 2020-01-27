'use strict';

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.sequelize.transaction(transaction => {
      return queryInterface.sequelize.query(`   
     

    alter table extras
        add "avatarUrl" text;
  
    
    `, { transaction }).then(_ => {
        return queryInterface.sequelize.query(`   
  select id,"avatarUrl" from products;
  `, { transaction }).then(products => {
          let sql = '';
          for (const product of products[0]) {
            if (product.avatarUrl === null) { continue; }
            sql += `update "extras" set "avatarUrl"='${product.avatarUrl}' where "productId"=${product.id};`;
          }
          return queryInterface.sequelize.query(sql, { transaction }).then(_ => {
            return queryInterface.sequelize.query('alter table products drop column "avatarUrl";', { transaction });
          });
        });
      });
    });
  },

  down: (queryInterface, _) => {
    return queryInterface.sequelize.query(`  
    `);
  }
};
