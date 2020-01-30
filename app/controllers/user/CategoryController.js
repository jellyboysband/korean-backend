const CategoryService = require('../../services/CategoryService');

class CategoryController {
  static async list(ctx) {
    const { list, count, limit, offset } = await CategoryService.list(ctx.QUERY);
    ctx.body = {
      list: list.map(category => {
        return {
          id: category.id,
          name: category.name,
          parentId: category.parentId
        };
      }),
      count,
      limit,
      offset
    };
  }
}

module.exports = CategoryController;
