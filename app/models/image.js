class ImageDAO {

    constructor(db) {
        this.collection = (async () => {
            return db.then(dbo => dbo.collection('image'));
        })();
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
}

module.exports = ImageDAO;