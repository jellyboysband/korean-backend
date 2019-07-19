'use strict';

const QueryUtil = require('../../../app/utils/QueryUtil');

describe('utils/QueryUtil', () => {
  it('should return the order array for sequelize query', async () => {
    const order = QueryUtil.generateOrder(['-id', 'title', '-description'], ['id', 'title']);

    expect(order.length).toEqual(2);
    expect(order[0]).toEqual(['id', 'DESC']);
    expect(order[1]).toEqual(['title', 'ASC']);
  });
});
