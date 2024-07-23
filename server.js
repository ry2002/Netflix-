const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Dummy functions to simulate sending OTP
function sendEmail(email, otp) {
    console.log(`Sending OTP ${otp} to email ${email}`);
    // Implement email sending logic here (e.g., using SendGrid, Mailgun)
}

function sendSMS(phone, otp) {
    console.log(`Sending OTP ${otp} to phone ${phone}`);
    // Implement SMS sending logic here (e.g., using Twilio)
}

// Route to send OTP
app.post('/send-otp', (req, res) => {
    const { contactInfo } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

    // Determine if contactInfo is email or phone number
    const isEmail = contactInfo.includes('@');
    
    if (isEmail) {
        sendEmail(contactInfo, otp);
    } else {
        sendSMS(contactInfo, otp);
    }

    res.json({ otp: otp });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
