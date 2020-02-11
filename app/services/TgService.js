const { bot } = require('../utils/bot');
const { tgConfig } = require('../config');
const Markup = require('telegraf/markup');


class TgService {
  static async sendNotify({ phone, cost, url }) {
    try {
      await bot.telegram.sendMessage(
        tgConfig.channel,
        `Поступил заказ от номера [${phone}](tel:${phone}) на сумму ${cost}₽`,
        {
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
          reply_markup: Markup.inlineKeyboard([
            Markup.urlButton('ОБРАБОТАТЬ', url),
          ]),
        },
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}

module.exports = TgService;

