'use strict';
module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define(
    'orders',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phone: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      data: {
        allowNull: false,
        type: Sequelize.JSON
      },
      cost: {
        allowNull: false,
        type: Sequelize.INTEGER

      },
      status: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: 'WAITING'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    },
    {
      timestamps: false
    }
  );
  // eslint-disable-next-line
  order.associate = models => { };
  return order;
};
