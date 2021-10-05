class ProdutoDAO {

    constructor(db) {
        this.collection = (async () => {
            return db.then(dbo => dbo.collection('produto'));
        })();
    }

    async searchAll() {
        return this.collection.then(dbo => dbo.find({},{projection: {_id: 0}}).toArray());
    }

    async insert(product) {
        return this.collection.then(dbo => dbo.insertMany(product));
    }
}

module.exports = ProdutoDAO;