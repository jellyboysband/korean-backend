const db = require('../db');
const Repository = require('../repositories/ServiceRepository');

class BrandService {
  static async getByName(name, transaction = null, lock = null) {
    const brand = await db.models.Brand.findOne({
      where: { name },
      transaction,
      lock
    });
    return Repository.brand(brand);
  }

  static async getById(id, transaction = null, lock = null) {
    const brand = await db.models.Brand.scope(null).findOne({
      where: { id },
      transaction,
      lock
    });
    return Repository.brand(brand);
  }

  static async create({ name }) {
    return await db.sequelize.transaction(async transaction => {
      const brand = await db.models.Brand.create({ name }, { transaction });

      return Repository.brand(brand);
    });
  }
  // eslint-disable-next-line
  static async list({ limit, offset, order, ...filter }, transaction = null, lock = null) {
    const where = {};
    const list = await db.models.Brand.findAll({ where, limit, offset, transaction, lock });
    return list.map(Repository.brand);
  }

  static async delete(id) {
    return await db.sequelize.transaction(async transaction => {
      return await db.models.Brand.update({ deleted: true }, { where: { id }, transaction });
    });
  }
}

module.exports = BrandService;
