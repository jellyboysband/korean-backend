const crypto = require('crypto');

class PasswordManager {
  constructor(salt) {
    if (!salt) {
      throw new Error('salt is empty');
    }
    this.salt = salt;
  }

  hash(password) {
    return crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  }

  validate(password, hash) {
    return this.hash(password) === hash;
  }

  generate(len = 8) {
    if (len < 8) {
      len = 8;
    }
    let password = '';
    const upperSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerSymbols = upperSymbols.toLowerCase();
    const numbers = '0123456789';
    const symbols = upperSymbols + lowerSymbols + numbers;
    for (let i = 0; i < len - 3; i++) {
      password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    let position = Math.floor(Math.random() * (password.length + 1));
    password =
      password.slice(0, position) +
      upperSymbols.charAt(Math.floor(Math.random() * upperSymbols.length)) +
      password.slice(position);
    position = Math.floor(Math.random() * (password.length + 1));
    password =
      password.slice(0, position) +
      lowerSymbols.charAt(Math.floor(Math.random() * lowerSymbols.length)) +
      password.slice(position);

    position = Math.floor(Math.random() * (password.length + 1));
    password =
      password.slice(0, position) +
      numbers.charAt(Math.floor(Math.random() * numbers.length)) +
      password.slice(position);
    const passwordHash = this.hash(password);
    return { password, passwordHash };
  }
}

module.exports = PasswordManager;
