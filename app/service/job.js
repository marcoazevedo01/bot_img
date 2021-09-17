const Controller = require('../controller/image.js');

module.exports = Job => {
    var CronJob = require('cron').CronJob;
    var job = new CronJob('1 * * * * *', function () { //* * * 1 * *  um dia
        try {
            const controller = new Controller();
            //controller.save();
        } catch {
            console.log('cron falhou');
        }
    });
    job.start();
}