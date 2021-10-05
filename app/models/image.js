class ImageDAO {

    constructor(db) {
        this.collection = (async () => {
            return db.then(dbo => dbo.collection('imagens'));
        })();
    }

    async search(array) {
      console.log(array);
        return this.collection.then(dbo => dbo.find({'barCode': {$in: array}},{projection: {_id: 0}}).toArray());
    }

    async searchAll() {
        return this.collection.then(dbo => dbo.find({},{projection: {_id: 0}}).toArray());
    }

    async searchOneByCod(cod) {
        return this.collection.then(dbo => dbo.findOne({
            'barCode': cod
        }));
    }

    async insertOrUpdate(image) {
        return this.collection.then(dbo => dbo.findOneAndUpdate({
            'barCode': image.barCode
        }, {
            $set: image
        }, {
            upsert: true,
        }));
    }

    async removeOneByCod(cod) {
        return this.collection.then(dbo => dbo.deleteOne({
            'barCode': cod
        }));
    }
}

module.exports = ImageDAO;