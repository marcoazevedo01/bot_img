const {MongoClient} = require('mongodb');

module.exports = (async () => {
    db = await new MongoClient.connect(process.env.MONGO_URL, {useUnifiedTopology: true});
    return await db.db('site'); 
})();