'use strict';

// const Suite = require('../../suite');
const PasswordManager = require('../../../app/utils/PasswordManager');
const passwordManager = new PasswordManager('test');

describe('utils/PasswordManager', () => {
  it('should return token ', async () => {
    const password = 'asfasdfsadfasdg';
    const hash = passwordManager.hash(password);
    expect(passwordManager.validate(password, hash)).toEqual(true);
  });
  it('should return password and passwordHash', async () => {
    const len = 13;
    const { password, passwordHash } = passwordManager.generate(len);
    expect(passwordManager.validate(password, passwordHash)).toEqual(true);
    expect(password.length).toEqual(len);
    // eslint-disable-next-line no-control-regex
    const regexp = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}');
    expect(regexp.test(password)).toEqual(true);
  });
});
