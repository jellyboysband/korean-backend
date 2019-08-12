const BrandService = require('../../services/BrandService');

class BrandController {
  static async list(ctx) {
    const { list, limit, count, offset } = await BrandService.list(ctx.QUERY);
    ctx.body = {
      list: list.map(entity => {
        return { id: entity.id, name: entity.name };
      }),
      limit,
      count,
      offset
    };
  }
}

module.exports = BrandController;
