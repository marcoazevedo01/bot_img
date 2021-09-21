const imageCtrl = require('../controller/image.js');

module.exports = () => {
    var CronJob = require('cron').CronJob;
    var job = new CronJob('* * * * * *', function () { //* * * 1 * *  um dia
        try {
            imageCtrl.getAndSavedImages();
        } catch {
            console.log('cron falhou');
        }
    });
    job.start();
}