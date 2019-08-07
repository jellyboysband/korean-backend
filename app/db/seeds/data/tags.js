const create = name => {
  return { name };
};

const records = [];
for (let i = 1; i <= 30; i++) {
  records.push(create(`tag${i}`));
}

module.exports = { table: 'tags', records };
