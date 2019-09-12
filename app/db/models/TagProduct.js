'use strict';
module.exports = (sequelize, Sequelize) => {
  const tagProduct = sequelize.define(
    'tagProduct',
    {
      tagId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: false,
        primaryKey: true
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  // eslint-disable-next-line
  tagProduct.associate = models => {};
  // tagProduct.removeAttribute('id');

  return tagProduct;
};
