const { adminSalt } = require('../../../config');
const PasswordManager = require('../../../utils/PasswordManager');
const passwordManager = new PasswordManager(adminSalt);

const create = (username, password) => {
  return {
    username,
    passwordHash: passwordManager.hash(password)
  };
};

const records = [];
for (let i = 1; i <= 1; i++) {
  records.push(create(`admin${i}`, `admin${i}`));
}

module.exports = { table: 'admins', records };
