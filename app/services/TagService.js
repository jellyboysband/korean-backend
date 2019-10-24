const db = require('../db');
const QueryUtil = require('../utils/QueryUtil');
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

  static async createRefs(refs, transaction = null) {
    return await db.models.TagProduct.bulkCreate(refs, { transaction });
  }
  static async deleteRefs(where, transaction = null) {
    return await db.models.TagProduct.destroy({ where, transaction });
  }
  // eslint-disable-next-line
  static async list({ limit, offset, order, ...filter }, transaction = null, lock = null) {
    order = QueryUtil.generateOrder(order, Object.keys(db.models.Admin.rawAttributes));
    const where = {};
    const list = await db.models.Tag.findAll({ where, limit, offset, transaction, lock });
    const count = await db.models.Admin.count({ where, transaction, lock });
    return {
      list: list.map(Repository.tag),
      limit,
      offset,
      count
    };
  }

  static async delete(id) {
    return await db.sequelize.transaction(async transaction => {
      return await db.models.Tag.update({ deleted: true }, { where: { id }, transaction });
    });
  }
}

module.exports = TagService;
