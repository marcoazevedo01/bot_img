const ImageControll =  require('../controller/image');
const imageControll = new ImageControll();

module.exports = (app) => {
    app.route('/image')
        .get(imageControll.list())
        .post(imageControll.save())

};