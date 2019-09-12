const create = name => {
  return { name };
};

const records = [];
for (let i = 1; i <= 5; i++) {
  records.push(create(`brand${i}`));
}

module.exports = { table: 'brands', records };
