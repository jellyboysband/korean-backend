const db = require('../db');

class BrandService {
  static async getByName(name, transaction = null, lock = null) {
    const brand = await db.models.Brand.findOne({
      where: { name },
      transaction,
      lock
    });
    return BrandService.dataPresenter(brand);
  }

  static async getById(id, transaction = null, lock = null) {
    const brand = await db.models.Brand.scope(null).findOne({
      where: { id },
      transaction,
      lock
    });
    return BrandService.dataPresenter(brand);
  }

  static async create({ name }) {
    return await db.sequelize.transaction(async transaction => {
      await db.models.Brand.create({ name }, { transaction });

      const where = {};
      const list = await db.models.Brand.findAll({ where, transaction });
      return list.map(BrandService.dataPresenter);
    });
  }
  // eslint-disable-next-line
  static async list({ limit, offset, order, ...filter }, transaction = null, lock = null) {
    const where = {};
    const list = await db.models.Brand.findAll({ where, limit, offset, transaction, lock });
    return list.map(BrandService.dataPresenter);
  }

  static async delete(id) {
    return await db.sequelize.transaction(async transaction => {
      return await db.models.Brand.update({ deleted: true }, { where: { id }, transaction });
    });
  }

  static dataPresenter(entity) {
    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      name: entity.name
    };
  }
}

module.exports = BrandService;
