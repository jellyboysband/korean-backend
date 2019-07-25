const create = ({ name, description, apply, price, id, avatarUrl, deleted }) => {
  return { name, description, apply, price, id, avatarUrl, deleted };
};

const { records: brands } = require('./brands');
const records = [];

for (let i = 1; i <= brands.length; i++) {
  for (let j = 1; j <= 2; j++) {
    records.push(
      create({
        name: `product${i}${j}`,
        description: `description${i}${j}`,
        apply: `apply${i}${j}`,
        // eslint-disable-next-line no-mixed-operators
        price: i * 10 + j,
        id: i,
        // eslint-disable-next-line no-mixed-operators
        avatarUrl: `https://picsum.photos/id/${(i * 10 + j) % 1000}/400/400`,
        deleted: Boolean(j % 2)
      })
    );
  }
}

module.exports = { table: 'products', records };
