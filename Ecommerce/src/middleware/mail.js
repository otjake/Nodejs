const nodemailer = require('nodemailer');
const ejs = require('ejs');
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
const sendTestEmail = async (user,templatePath) => {
    const mailOptions = {
        from: 'ecommerce@gmail.com',
        to: user.email,
        subject: 'Welcome To eCommerce',
        html: await renderEmailTemplate({
            name: user.name ,
            email: user.email ,
        }, templatePath),
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