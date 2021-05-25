const {downloadZipFromURL} = require('./utils');

const cron = require('node-cron');

//Run Ogni 15 giorni per refresh
cron.schedule('0 12 */14 * *', () => {
    downloadZipFromURL();
});



//TODO : wirare con bot telegram






