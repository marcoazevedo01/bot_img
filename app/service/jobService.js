module.exports = () => {//nao esta sendo ultilizado
    var CronJob = require('cron').CronJob;
    var job = new CronJob('* * * * * *', () => { //* * * 1 * *  um dia
        try {
           console.log('cron ativo');
        } catch {
            console.log('cron falhou');
        }
    });
    job.start();
}