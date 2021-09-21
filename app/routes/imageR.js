const ImageCtrl = require('../controller/image');
const imageCtrl = new ImageCtrl();

module.exports = (app) => {
    app.route('/image')
        .get(imageCtrl.listAll())

    app.route('/image/:cod')
        .get(imageCtrl.listOneByCodBar())

};