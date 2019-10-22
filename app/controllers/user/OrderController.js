const OrderService = require('../../services/OrderService');
const ProductService = require('../../services/ProductService');

class OrderController {
  static async getByPhone(ctx) {
    const { list } = await OrderService.list(ctx.QUERY);
    ctx.body = {
      list
    };
  }
  static async create(ctx) {
    const ids = ctx.BODY.list.map(it => it.productId);
    const { list: products, count } = await ProductService.list({ id: ids });
    if (count !== ids.length) {
      ctx.throw(400, 'invalid products');
    }
    ctx.BODY.products = products;
    const { id } = await OrderService.create(ctx.BODY);
    ctx.body = { id };
  }
  static async getById(ctx) {
    const order = await OrderService.getById(ctx.PARAMS.id);
    ctx.body = order;
  }
}

module.exports = OrderController;
