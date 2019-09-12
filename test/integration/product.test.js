const supertest = require('supertest');
const app = require('../../app');

const server = app.listen();

const { ProductSuite, BrandSuite } = require('../suite');
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

describe('Product', () => {
  const request = supertest(server);

  describe('GET /products', () => {
    it('<200> ', async () => {
      const { token } = await AdminSuite.adminRegister();
      const brand = await BrandSuite.createBrand();
      for (let i = 1; i < 7; i++) {
        await ProductSuite.createProduct({ brandId: brand.id });
      }

      await request
        .get('/api/products')
        .set('adminCookie', token)
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
  describe('GET /product/{id}', () => {
    it('<200> ', async () => {
      const { token } = await AdminSuite.adminRegister();
      const brand = await BrandSuite.createBrand();
      const { id } = await ProductSuite.createProduct({ brandId: brand.id });
      await request
        .get(`/api/product/${id}`)
        .set('adminCookie', token)
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
  describe('POST /product', () => {
    it('<200> ', async () => {
      const { token } = await AdminSuite.adminRegister();
      const brand = await BrandSuite.createBrand();

      await request
        .post('/api/admin/product')
        .send({
          name: 'ksmfid',
          description: 'asDaf',
          brandId: brand.id,
          apply: 'sdfsdf',
          price: 132
        })
        .set('adminCookie', token)
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
  describe('DELETE /product', () => {
    it('<200> ', async () => {
      const { token } = await AdminSuite.adminRegister();
      const brand = await BrandSuite.createBrand();
      const product = await ProductSuite.createProduct({ brandId: brand.id });

      await request
        .delete('/api/admin/product?id=' + product.id)
        .set('adminCookie', token)
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});
