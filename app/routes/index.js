'use strict';

const spec = require('./spec');
const deref = require('json-schema-deref-sync');
const { paths } = deref(spec, { mergeAdditionalProperties: true });

const Router = require('koa-router');
const OpenApiMiddleware = require('../middlewares/OpenApiMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = new Router();

// set routers from documentation
Object.keys(paths).forEach(path => {
  Object.keys(paths[path]).forEach(method => {
    const route = paths[path][method];
    const [controller, action] = route.operationId.split('.');
    const controllerClass = require(`../controllers/${controller}`);
    const middlewares = [];
    // json schema and query serializer
    middlewares.push(OpenApiMiddleware(route));
    if (route.security) {
      for (const security of route.security) {
        if (security.adminTokenSecurity) {
          middlewares.push(adminMiddleware.checkToken);
        }
      }
    }
    middlewares.push(controllerClass[action]);
    // eslint-disable-next-line no-useless-escape
    const pathString = path.replace(/\{([^\{]+)\}/g, ':$1');
    router[method](pathString, ...middlewares);
  });
});

module.exports = router;
