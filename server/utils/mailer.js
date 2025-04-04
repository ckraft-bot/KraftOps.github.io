const nodemailer = require('nodemailer');

require('dotenv').config();  // Load environment variables

// Create the transporter object using your email service's SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Or use another email provider like SendGrid, Mailgun, etc.
    auth: {
        user: process.env.EMAIL_USER,  // Your email address from environment variable
        pass: process.env.EMAIL_PASS,  // Your email password or app-specific password
    },
});

// Function to send an email
const sendEmail = (from, to, subject, text) => {
    const mailOptions = {
        from: from,  // Sender's email (from the form submission)
        to: to,      // Recipient email (e.g., your support email)
        subject: subject,  // Email subject
        text: text,  // Email body
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);  // Reject the promise with an error
            } else {
                resolve(info);  // Resolve the promise with the info if email is sent successfully
            }
        });
    });
};

module.exports = sendEmail;
