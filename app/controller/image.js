const mongoPool = require('../../config/mongoPool');
const PgProductDao = require('../models/pgProduct');
const ImageDAO = require('../models/image');
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

    listPag() {
        return async (req, resp) => {
            try {          
                const imageDAO = new ImageDAO(mongoPool);   
                resp.status(200).json(await imageDAO.search(req.body));
            } catch (erro) {
                resp.status(500).json(erro);
            }
        }
    }

    listOneByBarCod() {
        return async (req, resp) => {
            try {
                const imageDAO = new ImageDAO(mongoPool);
                resp.status(200).json(await imageDAO.searchOneByCod(req.params.cod));
            } catch (erro) {
                resp.status(500).json(erro);
            }
        }
    }

    addFromBarCod() {
        return async (req, resp) => {
            try {
                const barCode = req.params.cod;
                const imgBuffer = await httpService.getImage(`http://cdn-cosmos.bluesoft.com.br/products/${barCode}`);
                if (!imgBuffer) return resp.status(404).json({'msg': 'codigo invalido ou produto sem imagem'});
                const imageDAO = new ImageDAO(mongoPool);
                await imageDAO.insertOrUpdate({
                    'barCode': barCode,
                    'imgBuffer': await fileService.compressImage(imgBuffer, barCode)
                });
                return resp.status(200).json({
                    'msg': 'Imagem convertida e salva!'
                });
            } catch (erro) {
                resp.status(500).json(erro);
            }
        }
    }

    updateFromUrl() {
        return async (req, resp) => {
            try {
                const imageDAO = new ImageDAO(mongoPool);
                resp.status(200).json(await imageDAO.insertOrUpdate({
                    'barCode': req.body.barCode,
                    'imgBuffer': req.body.imgBuffer
                }));
            } catch (erro) {
                resp.status(500).json(erro);
            }
        }
    }

    updateAll() {
        return async (req, resp) => {
            try {
                const imageDAO = new ImageDAO(mongoPool);
                const fim = await PgProductDao.getLength();
                var skip = 0;
                while (skip <= fim) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    const pgListProducts = await PgProductDao.list(skip, 20);
                    await pgListProducts.rows.forEach(async produto => {
                        if (produto.codigo_barras == null || produto.codigo_barras == '') return;
                        const barCode = produto.codigo_barras.split('.')[0];
                        const imgBuffer = await httpService.getImage(`http://cdn-cosmos.bluesoft.com.br/products/${barCode}`);
                        if (!imgBuffer) return;
                        await imageDAO.insertOrUpdate({
                            'barCode': barCode,
                            'imgBuffer': await fileService.compressImage(imgBuffer, barCode)
                        });
                    });
                    skip += 20;
                }
                resp.status(200).json({
                    'result': 'imagens atualizadas'
                });
            } catch (erro) {
                resp.status(500).json(erro);
            }
        }
    }

    removeByCodBar() {
        return async (req, resp) => {
            try {
                const imageDAO = new ImageDAO(mongoPool);
                await imageDAO.removeOneByCod(req.params.cod);
                resp.status(200).json({'msg':'Imagem deletada da base de dados'});
            } catch (erro) {
                resp.status(500).json(erro);
            }
        }
    }

}

module.exports = ImageCtrl;