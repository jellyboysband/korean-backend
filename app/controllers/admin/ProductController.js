const ProductService = require('../../services/ProductService');
const UploadService = require('../../services/UploadService');

class ProductController {
  static async create(ctx) {
    const { id } = await ProductService.create(ctx.BODY);
    ctx.body = { id };
  }
  static async edit(ctx) {
    const { id } = ctx.params;
    await ProductService.edit(id, ctx.BODY);
    ctx.body = { id };
  }
  static async delete(ctx) {
    await ProductService.delete(ctx.PARAMS.id);
    ctx.body = { id: ctx.PARAMS.id };
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
      price: product.price,
      brand: {
        id: product.brand.id,
        name: product.brand.name
      },
      tags: product.tags,
      avatarUrl: product.avatarUrl
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
          price: product.price,
          brand: {
            id: product.brand.id,
            name: product.brand.name
          },

          tags: product.tags,
          // tags: product.tags,
          avatarUrl: product.avatarUrl
        };
      }),
      limit,
      offset,
      count
    };
  }

  static async image(ctx) {
    const { id } = ctx.PARAMS;

    const product = await ProductService.getById(id);
    if (!product) {
      ctx.throw(ctx.STATUS_CODES.NOT_FOUND, 'product not found');
    }
    let { file } = ctx.request.files;
    if (!file) {
      ctx.throw(ctx.STATUS_CODES.BAD_REQUEST, 'should have required property "files"');
    }
    const avatarUrl = await UploadService.uploadFile({ entityId: id, entity: 'products' }, file);

    await ProductService.update(id, { avatarUrl });
    ctx.body = {
      avatarUrl
    };
  }

  static async deleteImage(ctx) {
    const { id } = ctx.PARAMS;
    const product = await ProductService.getById(id);
    if (!product) {
      ctx.throw(ctx.STATUS_CODES.NOT_FOUND, 'product not found');
    }
    await ProductService.update(id, { avatarUrl: null });
    ctx.status = 200;
  }
}
module.exports = ProductController;
