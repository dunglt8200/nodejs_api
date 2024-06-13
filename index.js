const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const productRoute = require('./routes/product')
const productTypeRoute = require('./routes/product_type')
const configMongodb = require('./config/mongodb')
const bodyParser = require('body-parser')
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
app.use(productRoute)
app.use(productTypeRoute)

//mongodb
configMongodb.connectToMongo()

//run server
app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000)