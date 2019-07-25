const ProductService = require('../../app/services/ProductService');

class ProductSuite {
  static async createProduct({
    brandId,
    name = 'name',
    description = 'description',
    apply = 'apply',
    price = 100
  }) {
    return await ProductService.create({ brandId, name, description, apply, price });
  }
}

module.exports = ProductSuite;
