const {ObjectId} = require("mongodb");

class ImageDAO {

    constructor(db) {
        this.collection = (async () => {
            return db.then(dbo => dbo.collection('image'))
        })()
    }

    async searchAll() {
        return this.collection.then(dbo => dbo.find({}).toArray());
    }

    async insert(image) {
        return this.collection.then(dbo => dbo.insertOne(image));
    }
}

module.exports = ImageDAO;