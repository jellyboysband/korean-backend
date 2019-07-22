const BrandService = require('../../services/BrandService');

class BrandController { 
  
  static async list(ctx) {
    ctx.body = await BrandService.list(ctx.QUERY);
  } 
}

module.exports = BrandController;
