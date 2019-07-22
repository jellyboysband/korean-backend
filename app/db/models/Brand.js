'use strict';
module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
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
  product.associate = models => {
    // models.Product.belongsTo(models.Partner, { foreignKey: 'partnerId', targetKey: 'id' });
  };
  return product;
};
