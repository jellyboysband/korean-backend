const BrandService = require('../../services/BrandService');

class BrandController {
  static async list(ctx) {
    const list = await BrandService.list(ctx.QUERY);
    ctx.body = list.map(brand => {
      return {
        id: brand.id,
        name: brand.name
      };
    });
  }
}

module.exports = BrandController;
