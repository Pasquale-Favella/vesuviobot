const cron = require('node-cron');
const { Telegraf } = require('telegraf');

const {downloadZipFromURL} = require('./utils');

require("dotenv").config();

//Run Ogni 15 giorni per refresh
cron.schedule('0 12 */14 * *', () => {
    downloadZipFromURL();
});



//TODO : wirare con bot telegram



const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.launch()


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))






