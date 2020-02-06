const db = require('../db');
const Repository = require('../repositories/ServiceRepository');
const CategoryService = require('./CategoryService');

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
          model: db.models.Category,
          as: 'categories',
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

  // eslint-disable-next-line no-unused-vars
  static async create({ name, description, apply, price, brandId, categories = [], extras = [] }) {
    return await db.sequelize.transaction(async transaction => {
      const product = await db.models.Product.create(
        { name, description, apply, price, brandId },
        { transaction }
      );


      // product.extras = await db.models.ProductExtra.bulkCreate(extras.map(it => { return { price: it.price, volume: it.volume, weight: it.weight, productId: product.id }; }), { transaction, returning: true });
      await CategoryService.createRefs(
        categories.map(it => {
          return { categoryId: it, productId: product.id };
        }),
        transaction
      );

      return Repository.product(product);
    });
  }

  static async edit(id, { name, description, apply, price, brandId, categories = [] }) {
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
      if (categories.length) {
        await CategoryService.deleteRefs({ productId: id }, transaction);
        await CategoryService.createRefs(
          categories.map(it => {
            return { categoryId: it, productId: id };
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
    let whereCategory;
    if (typeof filter.categories !== 'undefined') {
      whereCategory = {};
      whereCategory.id = filter.categories;
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
          model: db.models.Category,
          as: 'categories',
          where: whereCategory,
          required: !!whereCategory
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


  static async getExtraById(id, transaction = null, lock = null) {
    const extra = await db.models.ProductExtra.findOne({
      where: { id },
      transaction,
      lock
    });
    return Repository.extra(extra);
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
      return await ProductService.updateExtra(id, { price, volume, weight }, transaction);
    });
  }

  static async updateExtra(id, body = {}, transaction = null) {
    const extra = await db.models.ProductExtra.update(body, {
      transaction,
      where: { id }
    });
    return Repository.extra(extra);
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
