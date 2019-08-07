const db = require('../db');
const Repository = require('../repositories/ServiceRepository');

class TagService {
  static async getByName(name, transaction = null, lock = null) {
    const tag = await db.models.Tag.findOne({
      where: { name },
      transaction,
      lock
    });
    return Repository.tag(tag);
  }

  static async getById(id, transaction = null, lock = null) {
    const tag = await db.models.Tag.scope(null).findOne({
      where: { id },
      transaction,
      lock
    });
    return Repository.tag(tag);
  }

  static async create({ name }) {
    return await db.sequelize.transaction(async transaction => {
      const tag = await db.models.Tag.create({ name }, { transaction });

      return Repository.tag(tag);
    });
  }
  // eslint-disable-next-line
  static async list({ limit, offset, order, ...filter }, transaction = null, lock = null) {
    const where = {};
    const list = await db.models.Tag.findAll({ where, limit, offset, transaction, lock });
    return list.map(Repository.tag);
  }

  static async delete(id) {
    return await db.sequelize.transaction(async transaction => {
      return await db.models.Tag.update({ deleted: true }, { where: { id }, transaction });
    });
  }
}

module.exports = TagService;
