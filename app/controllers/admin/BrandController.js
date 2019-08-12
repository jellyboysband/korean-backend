const BrandService = require('../../services/BrandService');
const STATUS_CODES = require('../../constants/statusCodes');

class BrandController {
  static async create(ctx) {
    let brand = await BrandService.getByName(ctx.BODY.name);
    if (brand) {
      ctx.throw(STATUS_CODES.CONFLICT, 'brand with this name exists');
    }
    brand = await BrandService.create(ctx.BODY);
    ctx.body = {
      id: brand.id
    };
  }
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
  static async delete(ctx) {
    const { id } = ctx.PARAMS;
    const brand = await BrandService.getById(id);
    if (!brand || brand.deleted) {
      ctx.throw(STATUS_CODES.NOT_FOUND, 'brand not found');
    }
    await BrandService.delete(id);
    ctx.body = { id };
  }
}

module.exports = BrandController;
