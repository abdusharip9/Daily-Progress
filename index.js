const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');

const app = express();
const port = 3000;

// Telegram bot tokeningizni bu yerga qo'yasiz
const token = '7977082141:AAE3-CmhF_6ua0A9Wt-AfbDYeg0czRZ4hjY';
const chatId = '1310068731';

// Botni polling rejimida ishga tushirish
const bot = new TelegramBot(token, { polling: true });

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.send('Telegram Bot Server is running.');
});

// Endpoint to send message
app.post('/send', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, error: 'Message is required.' });
  }

  bot.sendMessage(chatId, message)
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ success: false, error: 'Failed to send message.' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
