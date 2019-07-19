const { adminSalt } = require('../../../config');
const PasswordManager = require('../../../utils/PasswordManager');
const passwordManager = new PasswordManager(adminSalt);

const create = (role, username, password) => {
  return {
    username,
    passwordHash: passwordManager.hash(password),
    role
  };
};

const records = [];
for (let i = 1; i <= 2; i++) {
  records.push(create('ADMIN', `admin${i}`, `admin${i}`));
}

module.exports = { table: 'admins', records };
