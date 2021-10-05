const ProductCtrl = require('../controller/product');
const productCtrl = new ProductCtrl();

module.exports = (app) => {
    app.route('/product/move')
        .get(productCtrl.setImgToMongo())

};