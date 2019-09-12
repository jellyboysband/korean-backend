const TagService = require('../../services/TagService');

class TagController {
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
}

module.exports = TagController;
