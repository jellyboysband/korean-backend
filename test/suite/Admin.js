const AdminService = require('../../app/services/AdminService');

const { adminSalt, adminJwtKey } = require('../../app/config');

const PasswordManager = require('../../app/utils/PasswordManager');
const adminPasswordManager = new PasswordManager(adminSalt);
const JwtManager = require('../../app/utils/JwtManager');
const adminJwtManager = new JwtManager(adminJwtKey);
class AdminSuite {
  static async createAdmin(username = 'admin1', password = 'password') {
    const admin = AdminService.create({
      passwordHash: adminPasswordManager.hash(password),
      username
    });
    return admin;
  }

  static async loginAdmin(id) {
    const token = adminJwtManager.getToken(id);
    await AdminService.update(id, { tokens: [token] });
    return token;
  }
  static async adminRegister() {
    const admin = await AdminSuite.createAdmin();
    const token = await AdminSuite.loginAdmin(admin.id);
    return { admin, token };
  }

  static async getAdminById(id) {
    return await AdminService.getById(id);
  }
}
module.exports = AdminSuite;
