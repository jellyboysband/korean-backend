const AdminService = require('../../services/AdminService');

const { adminSalt, adminJwtKey } = require('../../config');

const PasswordManager = require('../../utils/PasswordManager');
const passwordManager = new PasswordManager(adminSalt);
const JwtManager = require('../../utils/JwtManager');
const jwtManager = new JwtManager(adminJwtKey);

class AuthController {
  static async login(ctx) {
    const { username, password } = ctx.BODY;
    const admin = await AdminService.getByUsername(username);
    if (!admin) {
      ctx.throw(ctx.STATUS_CODES.NOT_FOUND, 'admin not found');
    }
    if (!process.env.NODE_ENV === 'development') {
      const passwordHash = passwordManager.hash(password);
      if (passwordHash !== admin.passwordHash) {
        ctx.throw(ctx.STATUS_CODES.FORBIDDEN, 'incorrect password');
      }
    }
    const token = jwtManager.getToken(admin.id);

    await AdminService.login(admin.id, admin.tokens.concat(token));

    ctx.body = {
      username,
      token
    };
  }
  static async logout(ctx) {
    const { token } = ctx.headers;
    await AdminService.logout(ctx.state.admin.id, token);
    ctx.status = ctx.STATUS_CODES.OK;
  }
  static async profile(ctx) {
    const { admin } = ctx.state;
    ctx.body = {
      id: admin.id,
      username: admin.username
    };
  }
}
module.exports = AuthController;
