#!/usr/bin/env node

('use strict');

const config = require('./config');
const App = require('./app');
const logger = require('./logger');

const app = new App();

const handleError = (err, ctx) => {
  if (ctx == null) {
    logger.error({ err, event: 'error' }, 'Unhandled exception occured');
  }
};

const terminate = async signal => {
  try {
    await app.terminate();
  } finally {
    logger.info({ signal, event: 'terminate' }, 'App is terminated');
    process.kill(process.pid, signal);
  }
};

// Handle uncaught errors
app.on('error', handleError);

// Start server
if (!module.parent) {
  const server = app.listen(config.port, config.host, () => {
    logger.info(
      { event: 'execute' },
      `API server listening on ${config.host}:${config.port}, in ${config.env}`
    );
  });
  server.on('error', handleError);

  const errors = ['unhandledRejection', 'uncaughtException'];
  errors.map(error => {
    process.on(error, handleError);
  });

  const signals = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signals.map(signal => {
    process.once(signal, () => terminate(signal));
  });
}

// Expose app
module.exports = app;
