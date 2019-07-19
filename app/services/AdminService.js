class AdminService {
  // eslint-disable-next-line
  static async getById(id, transaction = null, lock = null) {
    const admin = {
      id
    };
    return AdminService.dataPresenter(admin);
  }

  // eslint-disable-next-line
  static async getByLogin(login, transaction = null, lock = null) {
    const admin = {
      id: 1,
      login
    };
    return AdminService.dataPresenter(admin);
  }
  // eslint-disable-next-line
  static async list({ limit, offset, order, ...filter } = {}) {
    const list = [
      {
        id: 1,
        login: 'login'
      }
    ];
    const count = list.length;
    return {
      list: list.map(AdminService.dataPresenter),
      limit,
      offset,
      count
    };
  }
  // eslint-disable-next-line
  static async delete(id) {}
  // eslint-disable-next-line
  static async edit(id, body) {}
  static async create(body) {
    return AdminService.dataPresenter(body);
  }
  // eslint-disable-next-line
  static async login(id, token) {}
  // eslint-disable-next-line
  static async logout(id, token) {}
  static dataPresenter(entity) {
    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      login: entity.login
    };
  }
}
module.exports = AdminService;
