const ProductService = require('../../services/ProductService');
const STATUS_CODES = require('../../constants/statusCodes');
class ProductController {
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
      // tags: product.tags,
      avatarUrl: product.avatarUrl
    };
  }
  static async list(ctx) {
    const { list } = await ProductService.list(ctx.QUERY);
    ctx.body = list.map(product => {
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
        // tags: product.tags,
        avatarUrl: product.avatarUrl
      };
    });
  }
}
module.exports = ProductController;
