const AdminService = require('../../services/AdminService');

const { adminSalt } = require('../../config');

const PasswordManager = require('../../utils/PasswordManager');
const passwordManager = new PasswordManager(adminSalt);

class AdminController {
  static async get(ctx) {
    const admin = await AdminService.getById(ctx.PARAMS.id);
    if (!admin) {
      ctx.throw(ctx.STATUS_CODES.NOT_FOUND, 'admin not found');
    }
    ctx.body = {
      id: admin.id,
      username: admin.username
    };
  }
  static async list(ctx) {
    const { list, count, limit, offset } = await AdminService.list(ctx.QUERY);
    ctx.body = {
      list: list.map(admin => {
        return {
          id: admin.id,
          username: admin.username
        };
      }),
      count,
      limit,
      offset
    };
  }
  static async delete(ctx) {
    const { id } = ctx.PARAMS;
    const admin = await AdminService.getById(ctx.PARAMS.id);
    if (!admin || admin.deleted) {
      ctx.throw(ctx.STATUS_CODES.NOT_FOUND, 'admin not found');
    }
    await AdminService.delete(id);
    ctx.body = { id };
  }
  static async create(ctx) {
    let admin = await AdminService.getByUsername(ctx.BODY.username);
    if (admin) {
      ctx.throw(ctx.STATUS_CODES.CONFLICT, 'admin with this login exists');
    }
    ctx.BODY.passwordHash = passwordManager.hash(ctx.BODY.password);

    admin = await AdminService.create(ctx.BODY);
    ctx.body = {
      id: admin.id
    };
  }
  // static async edit(ctx) {
  //   const { id } = ctx.PARAMS;
  //   const admin = await AdminService.getById(id);
  //   if (!admin) {
  //     ctx.throw(ctx.STATUS_CODES.NOT_FOUND, 'admin not found');
  //   }
  //   if (ctx.BODY.login) {
  //     const admin = await AdminService.getByLogin(ctx.BODY.login);
  //     if (admin && admin.id !== id) {
  //       ctx.throw(ctx.STATUS_CODES.CONFLICT, 'admin with this login exists');
  //     }
  //   }
  //   await AdminService.edit(id, ctx.BODY);
  //   ctx.body = {
  //     id
  //   };
  // }
}
module.exports = AdminController;
