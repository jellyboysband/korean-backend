'use strict';

module.exports = {
  up: (queryInterface, _) => {
    return queryInterface.sequelize.query(` 

    create table if not exists orders
    (
      id serial not null
        constraint orders_pkey
          primary key,
      phone text not null,
      data json not null,
      cost integer not null,
      status text default 'WAITING'::text not null,
      "createdAt" timestamp with time zone not null
    ); 
    
    create unique index if not exists orders_id_uindex
      on orders (id);
    
    
    

    alter table orders alter column "createdAt" set default now();


    `);
  },

  down: (queryInterface, _) => {
    return queryInterface.sequelize.query(`
      drop table "orders";
    
    `);
  }
};
