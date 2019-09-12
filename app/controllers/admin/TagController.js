const TagService = require('../../services/TagService');

class TagController {
  static async create(ctx) {
    let tag = await TagService.getByName(ctx.BODY.name);
    if (tag) {
      ctx.throw(ctx.STATUS_CODES.CONFLICT, 'tag with this name exists');
    }
    tag = await TagService.create(ctx.BODY);
    ctx.body = {
      id: tag.id
    };
  }
  static async list(ctx) {
    const { list, count, limit, offset } = await TagService.list(ctx.QUERY);
    ctx.body = {
      list: list.map(tag => {
        return {
          id: tag.id,
          name: tag.name
        };
      }),
      count,
      limit,
      offset
    };
  }
  static async delete(ctx) {
    const { id } = ctx.PARAMS;
    const tag = await TagService.getById(id);
    if (!tag || tag.deleted) {
      ctx.throw(ctx.STATUS_CODES.NOT_FOUND, 'tag not found');
    }
    await TagService.delete(id);
    ctx.body = { id };
  }
}

module.exports = TagController;
