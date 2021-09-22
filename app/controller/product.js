const pgPool = require('../../config/pgPool');

class ProductCtrl {
  static async list(skip, limit) {
    try {
      return await pgPool.query(`SELECT * FROM produtos ORDER BY id OFFSET ${skip} limit ${limit}`);
    } catch (erro) {
      return {'Erro':erro}
    }
  }

  static async getLength() {
    try {
      var resp = await pgPool.query(`SELECT COUNT(id) from produtos`);
      return resp.rows[0].count;
    } catch (erro) {
      return {'Erro':erro}
    }
  }
}


module.exports = ProductCtrl;