const supertest = require('supertest');
const app = require('../../app');

const server = app.listen();

const { BrandSuite } = require('../suite');
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

describe('Brand', () => {
  const request = supertest(server);

  describe('GET /brand', () => {
    it('<200> ', async () => {
      const { token } = await AdminSuite.adminRegister();
      let expectedArrayBrand = [];
      for (let i = 1; i < 7; i++) {
        expectedArrayBrand.push(await BrandSuite.createBrand(`brand${i}`));
        delete expectedArrayBrand[i - 1].deleted;
      }

      const res = await request
        .get('/api/brand')
        .set('adminCookie', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toEqual(expectedArrayBrand);
    });
  });

  describe('DELETE /brand', () => {
    it('<200> ', async () => {
      const { token } = await AdminSuite.adminRegister();
      const brand = await BrandSuite.createBrand('brand');

      await request
        .delete('/api/admin/brand?id=' + brand.id)
        .set('adminCookie', token)
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});
