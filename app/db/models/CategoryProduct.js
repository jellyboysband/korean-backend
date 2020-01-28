'use strict';
module.exports = (sequelize, Sequelize) => {
  const categoryProduct = sequelize.define(
    'categoryProduct',
    {
      categoryId: {
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
  categoryProduct.associate = models => { };
  // tagProduct.removeAttribute('id');

  return categoryProduct;
};
