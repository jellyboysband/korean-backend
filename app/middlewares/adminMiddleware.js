const AdminService = require('../services/AdminService');
const { UNAUTHORIZED } = require('../constants/statusCodes');
const { adminJwtKey } = require('../config');

const JwtManager = require('../utils/JwtManager');
const jwtManager = new JwtManager(adminJwtKey);

class AdminMiddleware {
  static async checkToken(ctx, next) {
    const { admincookie: token } = ctx.headers;
    let id = null;
    try {
      id = jwtManager.verify(token).id;
    } catch (err) {
      // ctx.status = UNAUTHORIZED;
      ctx.throw(UNAUTHORIZED, 'unauthorized');
    }
    const admin = await AdminService.getById(id);

    if (!admin || !admin.tokens.includes(token)) {
      // ctx.status = UNAUTHORIZED;
      ctx.throw(UNAUTHORIZED, 'unauthorized');
    }
    ctx.state.admin = admin;
    await next();
  }
}

AdminMiddleware.checkRole = incomingRoles => async (ctx, next) => {
  const role = ctx.state.admin.role;
  if (!incomingRoles.includes(role)) {
    ctx.throw(403, 'Access denied');
  }
  await next();
};

module.exports = AdminMiddleware;
