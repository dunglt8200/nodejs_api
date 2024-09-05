const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const configMongodb = require('./config/mongodb')
const bodyParser = require('body-parser')
const RouteManager = require('./config/RouteManager');
const cors = require('cors')

//cors
app.use(cors())

//morgan
app.use(morgan('combined'))

//middleware
app.use(morgan('dev'))

//static file
app.use(express.static(path.join(__dirname, 'public')))

//body-method post
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

//routes
const routeManager = new RouteManager(app);
routeManager.initializeRoutes();

//mongodb
configMongodb.connectToMongo()

//run server
app.get('/', function (req, res) {
    res.send('Hello World')
})

const PORT = process.env.NODE_ENV === 'development' ? 3002 : process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})