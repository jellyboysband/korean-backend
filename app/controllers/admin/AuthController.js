const AdminService = require('../../services/AdminService');

const { adminSalt, adminJwtKey } = require('../../config');
const STATUS_CODES = require('../../constants/statusCodes');

const PasswordManager = require('../../utils/PasswordManager');
const passwordManager = new PasswordManager(adminSalt);
const JwtManager = require('../../utils/JwtManager');
const jwtManager = new JwtManager(adminJwtKey);

class AuthController {
  static async login(ctx) {
    const { login, password } = ctx.BODY;
    const admin = await AdminService.getByLogin(login);
    if (!admin) {
      ctx.throw(STATUS_CODES.NOT_FOUND, 'admin not found');
    }
    const passwordHash = passwordManager.hash(password);
    if (passwordHash !== admin.passwordHash) {
      ctx.throw(STATUS_CODES.FORBIDDEN, 'incorrect password');
    }

    const token = jwtManager.getToken(admin.id);

    await AdminService.login(admin.id, token);

    ctx.body = {
      token
    };
  }
  static async logout(ctx) {
    const { token } = ctx.headers;
    await AdminService.logout(ctx.state.admin.id, token);
    ctx.status = STATUS_CODES.OK;
  }
  static async profile(ctx) {
    const { admin } = ctx.state;
    ctx.body = {
      id: admin.id,
      login: admin.login
    };
  }
}
module.exports = AuthController;
