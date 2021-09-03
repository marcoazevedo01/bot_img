const fs = require('fs');
const sharp = require('sharp');

exports.compressImage = (file, size) => {
    const newPath = file.path.split('.')[0] + '.webp';

    return sharp(file.path)
        .resize(450, 300)
        .toFormat('webp')
        .webp({
            quality: 100
        })
        .toBuffer()
        .then(data => {
            fs.access(file.path, (err) => {
                if (!err) {
                    fs.unlink(file.path, err => {
                        if (err) console.log(err)
                    })
                }
            });
            fs.writeFile(newPath, data, err => {
                if (err) {
                    throw err;
                }
            });
            return newPath;
        })
}