const db = require('../db');
const QueryUtil = require('../utils/QueryUtil');
const Repository = require('../repositories/ServiceRepository');
const ProductService = require('./ProductService');

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


  static async edit(id, { status, resolvedProducts = [] }) {
    return await db.sequelize.transaction(async transaction => {
      const order = await OrderService.getById(id, transaction, transaction.LOCK.UPDATE);

      const { list: products } = await ProductService.list({ id: resolvedProducts.map(it => it.productId) }, transaction);
      let cost = 0;
      const newData = [];
      resolvedProducts.forEach(it => {
        let product = products.find(p => p.id === it.productId);
        if (!product) {
          product = order.data.find(p => p.product.id === it.productId);
        }
        product.price = it.price;
        const price = product.price * it.count;
        cost += price;
        newData.push({ cost: price, count: it.count, product });
      });


      return await OrderService.update(id, { status, cost, data: newData }, transaction);
    });
  }
  static async update(id, data, transaction = null) {
    return await db.models.Order.update(data, { where: { id }, transaction });
  }
  // eslint-disable-next-line
  static async list({ limit, offset, order, ...filter }, transaction = null, lock = null) {
    order = QueryUtil.generateOrder(order, Object.keys(db.models.Order.rawAttributes));
    const where = {};
    if (typeof filter.status !== 'undefined') {
      where.status = filter.status;
    }
    if (typeof filter.phone !== 'undefined') {
      where.phone = {
        [db.Op.like]: '%filter.phone%'
      };
    }
    const list = await db.models.Order.findAll({ where, limit, offset, transaction, lock });
    // const products = await ProductService.list({id:list.data.product.id},transaction);
    const count = await db.models.Admin.count({ where, transaction });
    return {
      list: list.map(Repository.order),
      limit,
      offset,
      count
    };
  }
}

module.exports = OrderService;
