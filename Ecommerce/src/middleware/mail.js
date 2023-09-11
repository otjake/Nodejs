const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'smtp',
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: '558dd39d637677',
        pass: '2d8bc3a75f7f8d'
    }
});

module.exports = transporter;