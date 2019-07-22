const BrandService = require('../../services/BrandService');

class BrandController {
  static async create() {}

  static async get(ctx) {
    ctx.body = await BrandService.list(ctx.QUERY);
  }

  static async delete() {
  }
}

module.exports = BrandController;
