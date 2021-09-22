const imageCtrl = require('../controller/image.js');

module.exports = () => {
    var CronJob = require('cron').CronJob;
    var job = new CronJob('* * * * * *', () => { //* * * 1 * *  um dia
        try {
            //imageCtrl.getAndSavedImages(await productCtrl.getLength());18000
        } catch {
            console.log('cron falhou');
        }
    });
    job.start();
}