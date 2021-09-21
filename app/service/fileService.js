const sharp = require('sharp');

exports.compressImage = (file) => {
    return sharp(file)
        .resize(400, 400)
        .png({force: true})
        .toBuffer()
}