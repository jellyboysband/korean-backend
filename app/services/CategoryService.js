const db = require('../db');
const QueryUtil = require('../utils/QueryUtil');
const Repository = require('../repositories/ServiceRepository');

class CategoryService {
  static async getByName(name, transaction = null, lock = null) {
    const category = await db.models.Category.findOne({
      where: { name },
      transaction,
      lock
    });
    return Repository.category(category);
  }

  static async getById(id, transaction = null, lock = null) {
    const category = await db.models.Category.findOne({
      where: { id },
      transaction,
      lock
    });
    return Repository.category(category);
  }

  static async create({ name, parentId }) {
    return await db.sequelize.transaction(async transaction => {
      const category = await db.models.Category.create({ name, parentId }, { transaction });

      return Repository.category(category);
    });
  }

  static async edit(id, { name, parentId }) {
    const newData = {};
    if (typeof name !== 'undefined') {
      newData.name = name;
    }
    if (typeof parentId !== 'undefined') {
      newData.parentId = parentId;
    }
    return await db.sequelize.transaction(async transaction => {
      return await db.models.Category.update(newData, { where: { id }, transaction });
    });
  }
  static async createRefs(refs, transaction = null) {
    return await db.models.CategoryProduct.bulkCreate(refs, { transaction });
  }
  static async deleteRefs(where, transaction = null) {
    return await db.models.CategoryProduct.destroy({ where, transaction });
  }
  // eslint-disable-next-line
  static async list({ limit, offset, order, ...filter }, transaction = null, lock = null) {
    order = QueryUtil.generateOrder(order, Object.keys(db.models.Admin.rawAttributes));
    const where = {};
    const list = await db.models.Category.findAll({ where, limit, offset, order, transaction, lock });
    const count = await db.models.Admin.count({ where, transaction, lock });
    return {
      list: list.map(Repository.category),
      limit,
      offset,
      count
    };
  }

  static async delete(id) {
    return await db.sequelize.transaction(async transaction => {
      return await db.models.Category.update({ deleted: true }, { where: { id }, transaction });
    });
  }
}

module.exports = CategoryService;
