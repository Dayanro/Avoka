const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

// CORS setup
const whitelist = [process.env.DOMAIN, 'http://avoka.herokuapp.com']
const corsOptions = {
    origin: (origin, cb) => {
        const originIsWhitelisted = whitelist.includes(origin)
        cb(null, originIsWhitelisted)
    },
    credentials: true
}

module.exports = app => {

    app.use(cors(corsOptions))

    app.use(logger('dev'))
    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
    app.use(cookieParser())
}