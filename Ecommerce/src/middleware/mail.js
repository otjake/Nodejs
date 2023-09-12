const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require("path");
const fs = require('fs').promises;

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

// Function to send a test email
const sendTestEmail = async () => {
    const templatePath = path.join(__dirname, '..', '..' , 'views', 'mailTemplate/welcomeMail.ejs');
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@example.com',
        subject: 'Test Email',
        html: await renderEmailTemplate({ message: 'This is a test email message.' }, templatePath),
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Function to render the email template
const renderEmailTemplate = async (data, templatePath) => {
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    return ejs.render(templateContent, data);
};

module.exports = { sendTestEmail };