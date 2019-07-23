// eslint-disable-next-line
const BrandService = require('../../app/services/BrandService');

class BrandSuite {
  static async createBrand(name = 'name') {
    return await BrandService.create({ name });
  }
}

module.exports = BrandSuite;
