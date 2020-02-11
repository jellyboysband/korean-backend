const Agent = require('socks-proxy-agent');
const Telegraf = require('telegraf');

const { tgConfig } = require('../config');

let bot;
if (tgConfig.proxyUrl) {
  bot = new Telegraf(tgConfig.token, {
    telegram: {
      agent: new Agent(tgConfig.proxyUrl),
    },
  });
} else {
  bot = new Telegraf(tgConfig.token);
}
module.exports = { bot };
