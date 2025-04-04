const express = require('express');
const sendEmail = require('../utils/mailer');  // Import the sendEmail function
const router = express.Router();

// Contact form route
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation (you can expand this as needed)
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    // Create email content
    const subject = `New Inquiry from ${name}`;
    const text = `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    try {
        // Send the email using the sendEmail function from mailer.js
        const emailInfo = await sendEmail(email, 'your-receiving-email@example.com', subject, text);
        
        // Respond to the client
        res.status(200).send('Message sent successfully!');
    } catch (error) {
        // Handle any errors
        console.error('Error sending email:', error);
        res.status(500).send('Error occurred: ' + error.message);
    }
});

module.exports = router;
