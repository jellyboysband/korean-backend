const UploadService = require('../../services/UploadService');
const ProductService = require('../../services/ProductService');

class AvatarController {
  static async uploadAvatarProduct(ctx) {
    const { id } = ctx.PARAMS;

    let { file } = ctx.request.files;
    if (!file) {
      ctx.throw(ctx.STATUS_CODES.BAD_REQUEST, 'should have required property "file"');
    }

    let paths = await UploadService.uploadFile({ entityId: id, entity: 'products' }, file);

    await ProductService.update(id, { avatarUrl: paths });

    ctx.status = 200;
  }
}
module.exports = AvatarController;
