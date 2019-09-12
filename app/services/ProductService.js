const db = require('../db');
const Repository = require('../repositories/ServiceRepository');
const TagService = require('./TagService');

class ProductService {
  static async getById(id, transaction = null, lock = null) {
    const product = await db.models.Product.scope(null).findOne({
      where: { id },
      include: [
        {
          model: db.models.Brand,
          required: true
        },
        {
          model: db.models.Tag,
          as: 'tags',
          required: false
        }
      ],
      transaction,
      lock
    });
    return Repository.product(product);
  }

  static async create({ name, description, apply, price, brandId, tags = [] }) {
    return await db.sequelize.transaction(async transaction => {
      const product = await db.models.Product.create(
        { name, description, apply, price, brandId },
        { transaction }
      );

      await TagService.createRefs(
        tags.map(it => {
          return { tagId: it, productId: product.id };
        }),
        transaction
      );

      return Repository.product(product);
    });
  }
  static async edit({ name, description, apply, price, brandId }) {
    return await db.sequelize.transaction(async transaction => {
      const product = await db.models.Product.update(
        { name, description, apply, price, brandId },
        { transaction }
      );
      return Repository.product(product);
    });
  }
  static async update(id, body = {}, transaction = null) {
    const product = await db.models.Product.scope(null).update(body, {
      transaction,
      where: { id }
    });
    return Repository.product(product);
  }
  static async list({ limit, offset, order, ...filter }, transaction = null, lock = null) {
    const where = {};
    if (typeof filter.brandId !== 'undefined') {
      where.brandId = filter.brandId;
    }
    let whereTag = null;
    if (typeof filter.tags !== 'undefined') {
      whereTag = {};
      whereTag.id = filter.tags;
    }
    const list = await db.models.Product.findAll({
      where,
      include: [
        {
          model: db.models.Brand,
          as: 'brand',
          required: true
        },
        {
          model: db.models.Tag,
          as: 'tags',
          where: whereTag,
          required: !!whereTag
        }
      ],
      limit,
      offset,
      transaction,
      lock
    });
    const count = await db.models.Product.count({ where, transaction });
    return { list: list.map(Repository.product), count, limit, offset };
  }

  static async delete(id) {
    return await db.sequelize.transaction(async transaction => {
      return await ProductService.update(id, { deleted: true }, transaction);
    });
  }
}

module.exports = ProductService;
