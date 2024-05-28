const mongoClient = require('mongoose')

const connectToMongo = () => {
    const dbName = 'Organic_Food_Shop'
    mongoClient.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('✅ Connected database from mongodb.'))
        .catch((error) => console.error(`❌ Connect database is failed with error which is ${error}`))
}

module.exports = {
    connectToMongo
}