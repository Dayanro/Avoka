require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()

// Configs
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)



// app.use((req, res) => {
// res.sendFile(__dirname + "/public/index.html");
// });

// Base URLS

app.use('/api', require('./routes/user.routes'))
app.use('/api', require('./routes/auth.routes'))
app.use('/api', require('./routes/tag.routes'))
app.use('/api', require('./routes/post.routes'))


module.exports = app