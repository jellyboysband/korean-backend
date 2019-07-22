const db = require('../db');
const QueryUtil = require('../utils/QueryUtil');

class AdminService {
  static async getById(id, transaction = null, lock = null) {
    const admin = await db.models.Admin.scope(null).findOne({
      where: { id },
      transaction,
      lock
    });
    return AdminService.dataPresenter(admin);
  }

  static async getByUsername(username, transaction = null, lock = null) {
    const admin = await db.models.Admin.findOne({
      where: { username },
      transaction,
      lock
    });
    const result = AdminService.dataPresenter(admin);
    if (result) {
      result.passwordHash = admin.passwordHash;
    }
    return result;
  }
  // eslint-disable-next-line
  static async list({ limit, offset, order, ...filter }, transaction = null, lock = null) {
    order = QueryUtil.generateOrder(order, Object.keys(db.models.Admin.rawAttributes));
    const where = {};

    const list = await db.models.Admin.findAll({ where, limit, offset, transaction, lock });
    const count = await db.models.Admin.count({ where, transaction, lock });
    return {
      list: list.map(AdminService.dataPresenter),
      limit,
      offset,
      count
    };
  }
  static async delete(id) {
    return await db.sequelize.transaction(async transaction => {
      return await db.models.Admin.update({ deleted: true }, { where: { id }, transaction });
    });
  }
  static async edit(id, { passwordHash, username }) {
    const data = {};
    if (typeof passwordHash !== 'undefined') {
      data.passwordHash = passwordHash;
    }
    if (typeof username !== 'undefined') {
      data.username = username;
    }
    return await db.sequelize.transaction(async transaction => {
      return await AdminService.update(id, data, transaction);
    });
  }

  static async update(id, data, transaction = null) {
    return await db.models.Admin.update(data, { where: { id }, transaction });
  }

  static async create({ username, passwordHash }) {
    return await db.sequelize.transaction(async transaction => {
      const admin = await db.models.Admin.create({ username, passwordHash }, { transaction });
      return AdminService.dataPresenter(admin);
    });
  }
  static async login(id, tokens) {
    return await db.sequelize.transaction(async transaction => {
      const user = await AdminService.getById(id, transaction, transaction.LOCK.UPDATE);
      await AdminService.update(user.id, { tokens }, transaction);
    });
  }
  // static async logout(id, tokens) {
  //   return await db.sequelize.transaction(async transaction => {
  //     const user = await AdminService.getById(id, transaction, transaction.LOCK.UPDATE);
  //     await AdminService.update(user.id, { tokens }, transaction);
  //   });
  // }

  static dataPresenter(entity) {
    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      username: entity.username,
      tokens: entity.tokens,
      deleted: entity.deleted
    };
  }
}
module.exports = AdminService;
