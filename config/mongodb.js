const mongoClient = require('mongoose');
require('dotenv').config();

const connectToMongo = () => {
    const dbName = process.env.DB_NAME;
    const connectionStringLocal = process.env.MONGO_LOCAL_URL;
    const connectionStringCom = process.env.MONGO_COM_URL;

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