const cron = require('node-cron');
const { Telegraf } = require('telegraf');

const {downloadZipFromURL} = require('./utils');

require("dotenv").config();

const {orari} = require('./botActions')

//Run Ogni 15 giorni per refresh
cron.schedule('0 12 */14 * *', () => {
    downloadZipFromURL();
});


//TODO : implementare bot actions 



const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome bell'));
bot.on('sticker', (ctx) => ctx.reply('🖕'));
bot.hears('Ciao', (ctx) => ctx.reply('Weweeee'));
bot.command('orari', orari)
bot.launch()


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))






