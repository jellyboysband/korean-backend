'use strict';

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.sequelize.transaction(transaction => {
      return queryInterface.sequelize.query(`   
    create table extras
    (
        id          serial  not null
            constraint extras_pk
                primary key,
        price       integer not null,
        weight      integer,
        volume      integer,
        "productId" integer not null
            constraint extras_products_id_fk
                references products
    );

    alter table extras
        add deleted boolean default false not null;

    alter table extras
        owner to postgres;
    
    create unique index extras_id_uindex
        on extras (id);
    
    `, { transaction }).then(_ => {
        return queryInterface.sequelize.query(`   
    select id,price from products;
    `, { transaction }).then(products => {
          let sql = '';
          for (const product of products[0]) {
            sql += `INSERT INTO "extras" ( "price", "weight", "volume", "productId") VALUES (${product.price}, 0, 0, ${product.id});`;
          }
          return queryInterface.sequelize.query(sql, { transaction }).then(_ => {
            return queryInterface.sequelize.query('alter table products drop column price;', { transaction });
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
