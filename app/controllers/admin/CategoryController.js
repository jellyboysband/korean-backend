const CategoryService = require('../../services/CategoryService');

class CategoryController {
  static async create(ctx) {
    let category = await CategoryService.getByName(ctx.BODY.name);
    if (category) {
      ctx.throw(ctx.STATUS_CODES.CONFLICT, 'category with this name exists');
    }
    category = await CategoryService.create(ctx.BODY);
    ctx.body = {
      id: category.id
    };
  }
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
  static async delete(ctx) {
    const { id } = ctx.PARAMS;
    const category = await CategoryService.getById(id);
    if (!category || category.deleted) {
      ctx.throw(ctx.STATUS_CODES.NOT_FOUND, 'category not found');
    }
    await CategoryService.delete(id);
    ctx.body = { id };
  }
}

module.exports = CategoryController;
