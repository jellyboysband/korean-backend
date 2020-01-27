const ProductService = require('../../services/ProductService');
const UploadService = require('../../services/UploadService');

class ProductController {
  static async create(ctx) {
    const { id } = await ProductService.create(ctx.BODY);
    ctx.body = { id };
  }
  static async createExtra(ctx) {
    const { id } = await ProductService.createExtra(ctx.BODY);
    ctx.body = { id };
  }
  static async edit(ctx) {
    const { id } = ctx.params;
    await ProductService.edit(id, ctx.BODY);
    ctx.body = { id };
  }
  static async get(ctx) {
    const product = await ProductService.getById(ctx.PARAMS.id);
    if (!product) {
      ctx.throw(ctx.STATUS_CODES.NOT_FOUND, 'not found');
    }
    ctx.body = {
      id: product.id,
      name: product.name,
      description: product.description,
      apply: product.apply,
      brand: {
        id: product.brand.id,
        name: product.brand.name
      },
      tags: product.tags,
      avatarUrl: product.avatarUrl,
      extras: product.extras,
    };
  }
  static async list(ctx) {
    const { list, limit, offset, count } = await ProductService.list(ctx.QUERY);
    ctx.body = {
      list: list.map(product => {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          apply: product.apply,
          brand: {
            id: product.brand.id,
            name: product.brand.name
          },

          tags: product.tags,
          avatarUrl: product.avatarUrl,
          extras: product.extras,
        };
      }),
      limit,
      offset,
      count
    };
  }

  static async image(ctx) {
    const { id } = ctx.PARAMS;

    const productExtra = await ProductService.getExtraById(id);
    if (!productExtra) {
      ctx.throw(ctx.STATUS_CODES.NOT_FOUND, 'productExtra not found');
    }
    let { file } = ctx.request.files;
    if (!file) {
      ctx.throw(ctx.STATUS_CODES.BAD_REQUEST, 'should have required property "files"');
    }
    const avatarUrl = await UploadService.uploadFile({ entityId: id, entity: 'productsExtra' }, file);

    await ProductService.updateExtra(id, { avatarUrl });
    ctx.body = {
      avatarUrl
    };
  }

  static async deleteImage(ctx) {
    const { id } = ctx.PARAMS;
    const productExtra = await ProductService.getExtraById(id);
    if (!productExtra) {
      ctx.throw(ctx.STATUS_CODES.NOT_FOUND, 'productExtra not found');
    }
    await ProductService.updateExtra(id, { avatarUrl: null });
    ctx.status = 200;
  }

  static async listExtra(ctx) {
    const { list, count } = await ProductService.listExtra(ctx.QUERY);
    ctx.body = {
      list,
      limit: count,
      offset: 0,
      count
    };
  }
  static async editExtra(ctx) {
    const { id } = ctx.params;
    await ProductService.editExtra(id, ctx.BODY);
    ctx.body = { id };
  }
  static async delete(ctx) {
    await ProductService.delete(ctx.PARAMS.id);
    ctx.body = { id: ctx.PARAMS.id };
  }
  static async deleteExtra(ctx) {
    await ProductService.deleteExtra(ctx.PARAMS.id);
    ctx.body = { id: ctx.PARAMS.id };
  }
}
module.exports = ProductController;
