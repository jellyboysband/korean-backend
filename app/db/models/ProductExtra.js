'use strict';
module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
    'extras',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      volume: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      weight: {
        allowNull: true,
        type: Sequelize.INTEGER
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
  product.associate = models => {
    models.ProductExtra.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id' });
  };
  return product;
};
