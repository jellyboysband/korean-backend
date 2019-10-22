const db = require('../db');
const QueryUtil = require('../utils/QueryUtil');
const Repository = require('../repositories/ServiceRepository');

class OrderService {
  static async getById(id, transaction = null, lock = null) {
    const order = await db.models.Order.findOne({
      where: { id },
      transaction,
      lock
    });
    return Repository.order(order);
  }

  static async create({ phone, list, products }) {
    return await db.sequelize.transaction(async transaction => {
      const data = {
        phone,
        status: 'WAITING',
        cost: 0,
        data: []
      };
      list.forEach(it => {
        const product = products.find(p => p.id === it.productId);
        const price = product.price * it.count;
        data.cost += price;
        data.data.push({ cost: price, count: it.count, product });
      });
      const order = await db.models.Order.create(data, { transaction });

      return Repository.order(order);
    });
  }
  // eslint-disable-next-line
  static async list({ limit, offset, order, ...filter }, transaction = null, lock = null) {
    order = QueryUtil.generateOrder(order, Object.keys(db.models.Order.rawAttributes));
    const where = {};
    const list = await db.models.Order.findAll({ where, limit, offset, transaction, lock });
    const count = await db.models.Admin.count({ where, transaction, lock });
    return {
      list: list.map(Repository.order),
      limit,
      offset,
      count
    };
  }
}

module.exports = OrderService;
