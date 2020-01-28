'use strict';
module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
    'products',
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
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      apply: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      brandId: {
        allowNull: false,
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
    models.Product.belongsTo(models.Brand, { foreignKey: 'brandId', targetKey: 'id' });
    models.Product.hasMany(models.ProductExtra, { foreignKey: 'productId', targetKey: 'id' });
    models.Product.belongsToMany(models.Category, {
      through: models.CategoryProduct
    });

    // models.Product.hasMany(models.Tag, { foreignKey: 'id', sourceKey: 'productId' });
  };
  return product;
};
