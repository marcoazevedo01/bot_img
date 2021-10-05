const imageCtrl =  require('./imageR');
const productCtrl =  require('./productR');

module.exports = (app) => {
    imageCtrl(app);
    productCtrl(app);
}