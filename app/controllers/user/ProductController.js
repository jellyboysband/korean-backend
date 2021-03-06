const ProductService = require('../../services/ProductService');

class ProductController {
  static async get(ctx) {
    const product = await ProductService.getById(ctx.PARAMS.id);
    if (!product) {
      ctx.throw(ctx.STATUS_CODES.NOT_FOUND, 'not found');
    }
    ctx.body = {
      id: product.id,
      name: product.name,
      description: product.description,
      apply: product.apply,
      brand: {
        id: product.brand.id,
        name: product.brand.name
      },
      categories: product.categories,
      avatarUrl: product.avatarUrl,
      extras: product.extras,
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
          brand: {
            id: product.brand.id,
            name: product.brand.name
          },

          categories: product.categories,
          avatarUrl: product.avatarUrl,
          extras: product.extras,
        };
      }),
      limit,
      offset,
      count
    };
  }
}
module.exports = ProductController;
