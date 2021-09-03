const db = require('../../config/db');
const imageDAO = require('../models/imageDAO');
const imageDAO = new imageDAO(db);

class ImageControll {

    list() {
        return async (req, resp) => {
            try {
                resp.status(200).json({
                    'msg': 'ok'
                });
            } catch (erro) {
                resp.status(500).json(erro);
            }
        }
    }

    async get() {
        const cosmos = require('bluesoft-cosmos-api');
        cosmos.setToken(process.env.KEY_COSMOS);
        console.log(await cosmos.gtins('7897780207131'));
    }

    save() {
        return async (req, resp) => {
            try {
                if (req.file) {
                    await filehelper.compressImage(req.file, 350)
                    let data = {
                        'name': req.file.filename.split('.')[0] + '.webp',
                        'barCode': '',
                        'url': '',
                    }
                    await imageDAO.insert(data)
                }
                resp.status(200).json({
                    'msg': 'ok'
                });
            } catch (erro) {
                resp.status(500).json(erro);
            }
        }
    }
}

module.exports = ImageControll;