const mongoClient = require('mongoose');

const connectToMongo = () => {
    const dbName = "Organic_Food_Shop";
    const connectionStringCom = "mongodb+srv://dunglth82:Admin%40123@cluster0.w2oedq9.mongodb.net";
    const connectionStringLocal = "mongodb://127.0.0.1:27017";

    // Determine which connection string to use based on the environment
    const connectionString = process.env.NODE_ENV === 'development' ? `${connectionStringLocal}/${dbName}` : `${connectionStringCom}/${dbName}`;
    
    mongoClient.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error(`Failed to connect to MongoDB with error: ${error}`));
}

module.exports = {
    connectToMongo
};