'use strict';

// const Suite = require('../../suite');
const JwtManager = require('../../../app/utils/JwtManager');
const jwtManager = new JwtManager('test');

describe('utils/JwtManager', () => {
  it('should return token ', async () => {
    const id = 1;
    const token = jwtManager.getToken(id);
    expect(jwtManager.verify(token).id).toEqual(id);
  });
});
