'use strict';
module.exports = (sequelize, Sequelize) => {
  const tagProduct = sequelize.define(
    'tagProduct',
    {
      tagId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    },
    {
      timestamps: false
    }
  );
  // eslint-disable-next-line
  tagProduct.associate = models => {};
  // tagProduct.removeAttribute('id');

  return tagProduct;
};
