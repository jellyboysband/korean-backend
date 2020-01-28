'use strict';
module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define(
    'categories',
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

      parentId: {
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
  category.associate = models => {
    models.Category.belongsTo(models.Category, { foreignKey: 'parentId', targetKey: 'id' });
  };
  return category;
};
