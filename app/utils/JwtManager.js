const jwt = require('jsonwebtoken');

class JwtManager {
  constructor(jwtKey) {
    if (!jwtKey) {
      throw new Error('jwtKey is empty');
    }
    this.jwtKey = jwtKey;
  }
  getToken(id) {
    return jwt.sign({ id, createdAt: Date.now() }, this.jwtKey, { expiresIn: '30d' });
  }
  verify(token) {
    return jwt.verify(token, this.jwtKey);
  }
}

module.exports = JwtManager;
