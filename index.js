const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const userRoute = require('./routes/product')
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
app.use(userRoute)

//mongodb
configMongodb.connectToMongo()

//run server
app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000)