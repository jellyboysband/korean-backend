'use strict';
module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
    'admins',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      passwordHash: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      tokens: {
        allowNull: true,
        defaultValue: [],
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      deleted: {
        allowNull: true,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      }
    },
    {
      // будет применяться всегда, если не указано обратное
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
