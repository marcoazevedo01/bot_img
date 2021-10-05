const ImageCtrl = require('../controller/image');
const imageCtrl = new ImageCtrl();

module.exports = (app) => {
    app.route('/image')
        .get(imageCtrl.listAll())
        .put(imageCtrl.updateFromUrl())
        .post(imageCtrl.updateAll())

    app.route('/image/:cod')
        .get(imageCtrl.listOneByBarCod())
        .post(imageCtrl.addFromBarCod())
        .delete(imageCtrl.removeByCodBar())

    app.route('/images/array')
        .post(imageCtrl.listPag())
};