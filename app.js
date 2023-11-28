const qrcode = require('qrcode-terminal');

const { Client, LocalAuth, Chat } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});
var currentdate = new Date();

var cron = require('node-cron'); 

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.sendMessage('16314646407@c.us', `Your water reminder Mango Pie`);
    scheduleMessages();
});

client.initialize();

function scheduleMessages() {
    scheduleMessageAtSpecificTime(11, 0); // Send message at 11:00 AM
    scheduleMessageAtSpecificTime(13, 0); // Send message at 1:00 PM
    scheduleMessageAtSpecificTime(15, 15); // Send message at 3:15 PM
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
    client.sendMessage('16314646407@c.us', `Your water reminder Mango Pie`);
}
 