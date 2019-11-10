const db = require('../db');
const Repository = require('../repositories/ServiceRepository');
const TagService = require('./TagService');

class ProductService {
  static async getById(id, transaction = null, lock = null) {
    const product = await db.models.Product.findOne({
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
        },
        {
          model: db.models.ProductExtra,
          as: 'extras',
          required: false
        },
      ],
      transaction,
      lock
    });
    return Repository.product(product);
  }

  static async create({ name, description, apply, price, brandId, tags = [], extras = [] }) {
    return await db.sequelize.transaction(async transaction => {
      const product = await db.models.Product.create(
        { name, description, apply, price, brandId },
        { transaction }
      );


      await db.models.ProductExtra.bulkCreate(extras.map(it => { return { price: it.price, volume: it.volume, weight: it.weight, productId: product.id }; }), { transaction });
      await TagService.createRefs(
        tags.map(it => {
          return { tagId: it, productId: product.id };
        }),
        transaction
      );

      return Repository.product(product);
    });
  }

  static async edit(id, { name, description, apply, price, brandId, tags = [] }) {
    return await db.sequelize.transaction(async transaction => {
      const data = {};
      if (typeof name !== 'undefined') {
        data.name = name;
      }
      if (typeof description !== 'undefined') {
        data.description = description;
      }
      if (typeof apply !== 'undefined') {
        data.apply = apply;
      }
      if (typeof price !== 'undefined') {
        data.price = price;
      }
      if (typeof brandId !== 'undefined') {
        data.brandId = brandId;
      }
      const product = await ProductService.update(id, data, transaction);
      if (tags.length) {
        await TagService.deleteRefs({ productId: id }, transaction);
        await TagService.createRefs(
          tags.map(it => {
            return { tagId: it, productId: id };
          }),
          transaction
        );
      }
      return Repository.product(product);
    });
  }
  static async update(id, body = {}, transaction = null) {
    const product = await db.models.Product.update(body, {
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
    if (typeof filter.id !== 'undefined') {
      where.id = filter.id;
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
          model: db.models.ProductExtra,
          as: 'extras',
          required: false
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

  static async createExtra({ price, volume, weight, productId }) {
    return await db.sequelize.transaction(async transaction => {
      return await db.models.ProductExtra.create(
        { price, volume, weight, productId },
        { transaction }
      );
    });
  }

  static async editExtra(id, { price, volume, weight }) {
    return await db.sequelize.transaction(async transaction => {
      return await db.models.ProductExtra.update(
        { price, volume, weight },
        { where: { id }, transaction }
      );
    });
  }

  static async deleteExtra(id) {
    return await db.sequelize.transaction(async transaction => {
      return await db.models.ProductExtra.update(
        { deleted: true },
        { where: { id }, transaction }
      );
    });
  }


  static async listExtra(filter = {}, transaction = null, lock = null) {
    const where = {};

    if (typeof filter.id !== 'undefined') {
      where.id = filter.id;
    }

    const list = await db.models.ProductExtra.findAll({
      where,
      include: [
        {
          model: db.models.Product,
          as: 'product',
          required: true
        }
      ],
      transaction,
      lock
    });
    const count = await db.models.ProductExtra.count({ where, transaction });
    return { list: list.map(Repository.extra), count };
  }

  static async listExtraMin(filter = {}, transaction = null, lock = null) {
    const where = {};

    if (typeof filter.id !== 'undefined') {
      where.id = filter.id;
    }

    const list = await db.models.ProductExtra.findAll({
      where,
      transaction,
      lock
    });
    const count = await db.models.ProductExtra.count({ where, transaction });
    return { list: list.map(Repository.extra), count };
  }
}

module.exports = ProductService;
