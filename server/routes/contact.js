const nodemailer = require('nodemailer');

const sendEmail = async (from, to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from,
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

console.log('Request body:', req.body); // Log the incoming request
console.log('Sending email with subject:', subject); // Log email details