const db = require('../../config/db');
const ImageDAO = require('../models/imageDAO');
const imageDAO = new ImageDAO(db);
const cosmos = require('bluesoft-cosmos-api');
cosmos.setToken(process.env.KEY_COSMOS);

class ImageControll {

    list() {
        return async (req, resp) => {
            try {
                resp.status(200).json(await imageDAO.searchAll());
            } catch (erro) {
                resp.status(500).json(erro);
            }
        }
    }

    save() {
        return async (req, resp) => {
            try {
                const fs = require('fs');
                const axios = require('axios');
                //(pensar na paginacao dos itens)
                //get a lista de produtos com base no param limit de consulta na api
                //verificar se na lista retornada tem algum produto ja baixado. if remover
                //for pelo limit
                //delay de 1s entre as req(para evitar negacao de servico)
                var barCode = '7897780207131';
                const apiImage = await cosmos.gtins(barCode);
                var url = 'http://cdn-cosmos.bluesoft.com.br/products/' + barCode;
                var bufferImage = await axios({
                    url,
                    responseType: 'stream',
                })
                //converter img
                await bufferImage.data.pipe(fs.createWriteStream(`./app/public/img/${barCode}.${apiImage.data.brand.picture.split('.')[1]}`));
                //salvar como bytes no mongo
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