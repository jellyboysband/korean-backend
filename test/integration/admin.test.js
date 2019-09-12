'use strict';

const supertest = require('supertest');
const app = require('../../app');

const server = app.listen();

const { AdminSuite } = require('../suite');
const db = require('../../app/db');

beforeEach(async () => {
  await Promise.all(
    Object.keys(db.models).map(model => {
      return db.models[model].truncate({ cascade: true });
    })
  );
});

afterAll(async () => {
  await db.sequelize.close();
  await app.terminate();
});

describe('Misc', () => {
  const request = supertest(server);

  describe('GET /admins', () => {
    it('<200> should always adminList', async () => {
      const { token } = await AdminSuite.adminRegister();
      let expectedCount = 7;
      for (let i = 1; i < expectedCount; i++) {
        await AdminSuite.createAdmin(`adm${i}`, `adm${i}`);
      }
      const res = await request
        .get('/api/admin/admins')
        .set('adminCookie', token)
        .expect('Content-Type', /json/)
        .expect(200);

      const { count: actualCount } = res.body;

      expect(actualCount).toEqual(expectedCount);
    });
  });
});
