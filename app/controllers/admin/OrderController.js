const OrderService = require('../../services/OrderService');

class OrderController {
  static async list(ctx) {
    const { list, limit, offset, count } = await OrderService.list(ctx.QUERY);
    ctx.body = {
      list,
      limit,
      offset,
      count,
    };
  }
  static async edit(ctx) {
    const { id } = ctx.PARAMS;
    await OrderService.edit(id, ctx.BODY);
    ctx.body = { id };
  }
  static async setStatus(ctx) {
    const { id } = ctx.PARAMS;
    await OrderService.update(id, { status: ctx.BODY.status });
    ctx.body = { id };
  }
  static async getById(ctx) {
    const order = await OrderService.getById(ctx.PARAMS.id);
    ctx.body = order;
  }
}

module.exports = OrderController;
