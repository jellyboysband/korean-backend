'use strict';

const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-body');
const cors = require('@koa/cors');
const logging = require('@kasa/koa-logging');
const requestId = require('@kasa/koa-request-id');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./logger');
const router = require('./routes');
// const responseHandler = require('./middlewares/responseHandler');

const STATUS_CODES = {
  CONTINUE: 100,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  EXPIRED: 410,
  REQUEST_ENTITY_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};

class App extends Koa {
  constructor(...params) {
    super(...params);

    // Trust proxy
    this.proxy = true;
    // Disable `console.errors` except development env
    // this.silent = this.env !== 'development';

    this.servers = [];

    this.context.STATUS_CODES = STATUS_CODES;

    this._configureMiddlewares();
    this._configureRoutes();
  }

  _configureMiddlewares() {
    if (this.env === 'development') {
      this.use(
        require('koa-mount')('/dev/docs', require('koa-static')(path.join(__dirname, '/docs'), {}))
      );
    }
    // this.use(responseHandler());
    this.use(errorHandler());
    this.use(
      bodyParser({
        formLimit: '10mb',
        jsonLimit: '10mb',
        multipart: true,
        formidable: {
          // uploadDir: path.join(process.env.FRONT_PATH, process.env.UPLOAD_PATH),
          keepExtensions: true
        }
      })
    );

    this.use(requestId());
    this.use(
      logging({
        logger,
        overrideSerializers: false
      })
    );
    this.use(
      cors({
        origin: '*',
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
        allowHeaders: ['Content-Type', 'Authorization'],
        exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
      })
    );
  }

  _configureRoutes() {
    // Bootstrap application router
    this.use(router.routes());
    this.use(router.allowedMethods());
  }

  listen(...args) {
    const server = super.listen(...args);
    this.servers.push(server);
    return server;
  }

  async terminate() {
    for (const server of this.servers) {
      server.close();
    }
  }
}

module.exports = App;
