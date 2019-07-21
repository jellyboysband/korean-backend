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
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      agencyId: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      rawData: {
        allowNull: true,
        type: Sequelize.TEXT,
        get() {
          const data = this.getDataValue('rawData');
          return data ? JSON.parse(data) : null;
        },
        set(value) {
          this.setDataValue('rawData', value ? JSON.stringify(value) : null);
        }
      },
      isPrize: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      isFinished: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      count: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      expireDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      partnerId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      startTime: {
        allowNull: true,
        type: Sequelize.DATE
      },
      endTime: {
        allowNull: true,
        type: Sequelize.DATE
      },
      url: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      discountPercent: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      discountMoney: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      uniqueKey: {
        allowNull: true,
        unique: true,
        type: Sequelize.TEXT
      },
      images: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.TEXT)
      }
    },
    { timestamps: false }
  );
  // eslint-disable-next-line
  product.associate = models => {
    // models.Product.belongsTo(models.Partner, { foreignKey: 'partnerId', targetKey: 'id' });
  };
  return product;
};
