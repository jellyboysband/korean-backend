const ProductService = require('../../services/ProductService');
const STATUS_CODES = require('../../constants/statusCodes');
class ProductController {
  static async create(ctx) {
    const { id } = await ProductService.create(ctx.BODY);
    ctx.body = { id };
  }
  static async delete(ctx) {
    await ProductService.delete(ctx.PARAMS.id);
    ctx.body = { id: ctx.PARAMS.id };
  }
  static async get(ctx) {
    const product = await ProductService.getById(ctx.PARAMS.id);
    if (!product) {
      ctx.throw(STATUS_CODES.NOT_FOUND, 'not found');
    }
    ctx.body = {
      id: product.id,
      name: product.name,
      description: product.description,
      apply: product.apply,
      price: product.price,
      brand: {
        id: product.brand.id,
        name: product.brand.name
      },
      tags: product.tags,
      avatarUrl: product.avatarUrl
    };
  }
  static async list(ctx) {
    const { list, limit, offset, count } = await ProductService.list(ctx.QUERY);
    ctx.body = {
      list: list.map(product => {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          apply: product.apply,
          price: product.price,
          brand: {
            id: product.brand.id,
            name: product.brand.name
          },

          tags: product.tags,
          // tags: product.tags,
          avatarUrl: product.avatarUrl
        };
      }),
      limit,
      offset,
      count
    };
  }
}
module.exports = ProductController;
