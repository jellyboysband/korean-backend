const AdminService = require('../../services/AdminService');

const { adminSalt } = require('../../config');
const STATUS_CODES = require('../../constants/statusCodes');

const PasswordManager = require('../../utils/PasswordManager');
const passwordManager = new PasswordManager(adminSalt);

class AdminController {
  static async get(ctx) {
    const admin = await AdminService.getById(ctx.PARAMS.id);
    ctx.body = admin;
  }
  static async list(ctx) {
    const { list, count, limit, offset } = await AdminService.list(ctx.QUERY);
    ctx.body = { list, count, limit, offset };
  }
  static async delete(ctx) {
    const { id } = ctx.PARAMS;
    await AdminService.delete(id);
    ctx.body = { id };
  }
  static async edit(ctx) {
    const { id } = ctx.PARAMS;
    const admin = await AdminService.getById(id);
    if (!admin) {
      ctx.throw(STATUS_CODES.NOT_FOUND, 'admin not found');
    }
    if (ctx.BODY.login) {
      const admin = await AdminService.getByLogin(ctx.BODY.login);
      if (admin && admin.id !== id) {
        ctx.throw(STATUS_CODES.CONFLICT, 'admin with this login exists');
      }
    }
    await AdminService.edit(id, ctx.BODY);
    ctx.body = {
      id
    };
  }
  static async create(ctx) {
    let admin = await AdminService.getByLogin(ctx.BODY.login);
    if (admin) {
      ctx.throw(STATUS_CODES.CONFLICT, 'admin with this login exists');
    }
    ctx.BODY.passwordHash = passwordManager.hash(ctx.BODY.password);

    admin = await AdminService.create(ctx.BODY);
    ctx.body = {
      id: admin.id
    };
  }
}
module.exports = AdminController;
