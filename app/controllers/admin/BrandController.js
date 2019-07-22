const BrandService = require('../../services/BrandService');
const STATUS_CODES = require('../../constants/statusCodes');

class BrandController {
  static async create(ctx) {
    let brand = await BrandService.getByName(ctx.BODY.name);
    if (brand) {
      ctx.throw(STATUS_CODES.CONFLICT, 'brand with this name exists');
    }

    ctx.body = await BrandService.create(ctx.BODY);
  }

  static async delete(ctx) {
    const { id } = ctx.PARAMS;
    const brand = await BrandService.getById(ctx.PARAMS.id);
    if (!brand || brand.deleted) {
      ctx.throw(STATUS_CODES.CONFLICT, 'brand not found');
    }
    await BrandService.delete(id);
    ctx.body = { id };
  }
}

module.exports = BrandController;
