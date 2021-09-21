const mongoPool = require('../../config/mongoPool');
const ImageDAO = require('../models/image');
const productCtrl = require('../controller/product');
const httpService = require('../service/httpService');
const fileService = require('../service/fileService');

class ImageCtrl {

    listAll() {
        return async (req, resp) => {
            try {
                const imageDAO = new ImageDAO(mongoPool);
                resp.status(200).json(await imageDAO.searchAll());
            } catch (erro) {
                resp.status(500).json(erro);
            }
        }
    }

    listOneByCodBar() {
        return async (req, resp) => {
            try {
                const imageDAO = new ImageDAO(mongoPool);
                resp.status(200).json(await imageDAO.searchOneByCod(req.params.cod));
            } catch (erro) {
                resp.status(500).json(erro);
            }
        }
    }

    static async getAndSavedImages() {
        try {
            const imageDAO = new ImageDAO(mongoPool);
            const pgListProducts = await productCtrl.list(2, 3)
            await pgListProducts.rows.forEach(async produto => {
                if (produto.codigo_barras == null || produto.codigo_barras == '') return;
                const barCode = produto.codigo_barras.split('.')[0];
                const imgBuffer = await httpService.getImage(`http://cdn-cosmos.bluesoft.com.br/products/${barCode}`);
                if (!imgBuffer) return;
                await imageDAO.insertOrUpdate({
                    'barCode': barCode,
                    'imgBuffer': await fileService.compressImage(imgBuffer)
                });
            });
        } catch (erro) {
            console.log(erro);
        }
    }

}

module.exports = ImageCtrl;