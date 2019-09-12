const create = (tagId, productId) => {
  return { tagId, productId };
};

const { records: tags } = require('./tags');
const { records: products } = require('./products');
const records = [];

for (let i = 1; i <= products.length; i++) {
  for (let j = 1; j <= tags.length; j++) {
    if (Math.random() < 0.2) {
      records.push(create(j, i));
    }
  }
}

module.exports = { table: 'tagProduct', records };
