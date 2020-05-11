const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testfordev2@gmail.com',
        pass: process.env.PASSPORTEMAIL
    }
})

module.exports = transporter