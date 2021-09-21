const pgPool = require('../../config/pgPool');

class ProductCtrl {
  static async list(skip, limit) {
    try {
      return await pgPool.query(`SELECT * FROM produtos ORDER BY id OFFSET ${skip} limit ${limit}`);
    } catch (erro) {
      return {'Erro':erro}
    }
  }
}


module.exports = ProductCtrl;