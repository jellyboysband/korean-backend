'use strict';
module.exports = (sequelize, Sequelize) => {
  const brand = sequelize.define(
    'brands',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      deleted: {
        allowNull: true,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      }
    },
    {
      defaultScope: {
        where: {
          deleted: false
        }
      },
      timestamps: false
    }
  );
  // eslint-disable-next-line
  brand.associate = models => {};
  return brand;
};
