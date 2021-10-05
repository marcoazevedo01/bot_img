const ProductDAO = require('../models/product');
const PgProductDao = require('../models/pgProduct');

class ProductCtrl {

  setImgToMongo() {
    return async (req, resp) => {
      try {       
        const productDAO = new ProductDAO(mongoPool);
        resp.status(200).json(await productDAO.insert(await PgProductDao.getAll().then((value) => value.rows)));
      } catch (erro) {
        resp.status(500).json(erro);
      }
    }
  }

}


module.exports = ProductCtrl;