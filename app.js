const express = require('express');
const { Client } = require('whatsapp-web.js');
const path = require("path");
const qrcode = require('qrcode-terminal');

const app = express();

// Initialize a WhatsApp client
const client = new Client();
let qrC = '';

// Serve a simple homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

// Event fired when the QR code is generated
client.on('qr', (qr) => {
  console.log('QR Code generated!');
  qrC = qr;
  console.log(qrC);
  //qrcode.generate(qr, { small: true });
});

app.get('/getQR', (req,res) => {
    // const qrCo = qrC;
    // console.log(shopifyToken);
    res.json({ qrC });
})

// Event fired when the client is ready to connect
client.on('ready', () => {
  console.log('Client is ready!');
  scheduleMessages();
});

// Event fired upon receiving a new message
client.on('message', (message) => {
    console.log(`Received message: ${message.body}`);
    

});

function scheduleMessages() {
    scheduleMessageAtSpecificTime(11, 0); // Send message at 11:00 AM
    scheduleMessageAtSpecificTime(13, 0); // Send message at 1:00 PM
    scheduleMessageAtSpecificTime(16, 30); // Send message at 3:15 PM
}

function scheduleMessageAtSpecificTime(hours, minutes) {
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(hours, minutes, 0, 0); // Set the target time

    if (targetTime <= now) {
        targetTime.setDate(targetTime.getDate() + 1); // If target time has already passed for today, schedule it for tomorrow
    }

    const timeUntilTargetTime = targetTime - now;

    setTimeout(() => {
        sendMessage();
        setInterval(() => {
            sendMessage(); // Send message at the specified time every day
        }, 24 * 60 * 60 * 1000); // Repeat every 24 hours
    }, timeUntilTargetTime);
}

function sendMessage() {
    client.sendMessage('19876543210@c.us', `Your water reminder`);
}

// Connect the client
client.initialize();

// Start the server
const PORT = process.env.PORT || 8080; // Use environment port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
