'use strict';
const spec = require('../routes/spec');
exports.getSwaggerSpec = ctx => {
  ctx.body = spec;
};
