const Controller = new require('../app/controller/image');

module.exports = Job => {
    var CronJob = require('cron').CronJob;                         
    var job = new CronJob('1 * * * * *', function () {//* * * 1 * *  um dia
        try { 
            const controller = new Controller();
            controller.get();
        } catch {
            console.log('cron falhou');
        }
    });
    job.start();
}