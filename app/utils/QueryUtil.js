class QueryUtil {
  static generateOrder(sortArray = [], attributes) {
    const order = [];
    sortArray.forEach(it => {
      if (it[0] === '-' && attributes.includes(it.slice(1))) {
        order.push([it.slice(1), 'DESC']);
      } else if (attributes.includes(it)) {
        order.push([it, 'ASC']);
      }
    });
    return order;
  }
}
module.exports = QueryUtil;
