const TagService = require('../../services/TagService');
const STATUS_CODES = require('../../constants/statusCodes');

class TagController {
  static async create(ctx) {
    let tag = await TagService.getByName(ctx.BODY.name);
    if (tag) {
      ctx.throw(STATUS_CODES.CONFLICT, 'tag with this name exists');
    }
    tag = await TagService.create(ctx.BODY);
    ctx.body = {
      id: tag.id
    };
  }
  static async list(ctx) {
    const list = await TagService.list(ctx.QUERY);
    ctx.body = list.map(tag => {
      return {
        id: tag.id,
        name: tag.name
      };
    });
  }
  static async delete(ctx) {
    const { id } = ctx.QUERY;
    const tag = await TagService.getById(id);
    if (!tag || tag.deleted) {
      ctx.throw(STATUS_CODES.CONFLICT, 'tag not found');
    }
    await TagService.delete(id);
    ctx.body = {};
  }
}

module.exports = TagController;
