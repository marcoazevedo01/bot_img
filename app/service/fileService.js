const sharp = require('sharp');
const Color = require('color');

exports.compressImage = async (file, cod) => {
    return sharp(file)
        .resize(400, 400)
        .png({
            force: true,
            compressionLevel: 2,
            palette: true,
            progressive: true,
            quality: 75
        })
        .toBuffer()

}