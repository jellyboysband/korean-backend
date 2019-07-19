const ProductService = require('../../app/services/ProductService');
const PurchaseService = require('../../app/services/PurchaseService');

class UserSuite {
  static async createProduct({
    price = 1,
    title = 'product',
    description = 'description',
    rawData = {},
    isPrize = false,
    isFinished = false,
    count = 5,
    expireDate = null,
    partnerId,
    agencyId,
    startTime = null,
    endTime = null,
    url = null,
    discountPercent = null,
    discountMoney = null,
    uniqueKey = null,
    images = ['http://example.ru']
  }) {
    const data = {
      price,
      title,
      description,
      rawData,
      isPrize,
      isFinished,
      count,
      expireDate,
      partnerId,
      agencyId,
      startTime,
      endTime,
      url,
      discountPercent,
      discountMoney,
      uniqueKey,
      images
    };
    const product = ProductService.create(data);
    return product;
  }
  static async getById(id) {
    return await ProductService.getById(id);
  }
  static async purchase(userId, productId) {
    return await PurchaseService.purchase(userId, productId);
  }
}
module.exports = UserSuite;
