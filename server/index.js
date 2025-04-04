const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

require('dotenv').config();  // Load environment variables

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Contact route
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });    app.post('/contact', (req, res) => {
        console.log('Request body:', req.body); // Log the incoming request
    
        const { name, email, message } = req.body;
    
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
    
        const mailOptions = {
            from: email,
            to: 'kraftops25@gmail.com',
            subject: `Contact Form By ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error); // Log the error
                return res.status(500).send('Error occurred: ' + error.message);
            }
            console.log('Email sent:', info.response); // Log success
            res.status(200).send('Message sent successfully!');
        });
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'kraftops25@gmail.com',
        subject: `Contact Form By ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error occurred: ' + error.message);
        }
        res.status(200).send('Message sent successfully!');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
