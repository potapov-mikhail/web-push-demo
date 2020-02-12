const path = require('path');
const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');

const PORT = 5000;
const VAPID_PUBLICK_KEY =
  'BL2Vf8UY-zOGNc65xFcUvbQSEvuCuUHYRwdqXVgWMjjhEBOs6eeYVifrVijNEOAu0SF2jTsLZK4wdwGgpp8pfQA';
const VAPID_PRIVATE_KEY = 'Mhx6kMLVzRXhJnsVO0x_-cmfwOGJ4_OHsmNKJ_zaKVg';

webPush.setVapidDetails('mailto:test@test.com', VAPID_PUBLICK_KEY, VAPID_PRIVATE_KEY);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const timout = time => new Promise(resolve => setTimeout(() => resolve(), time));

app.post('/push', async (req, res) => {
  try {
    const subscription = req.body;
    res.status(200).json({ success: true });

    const payload = JSON.stringify({
      title: 'WEB PUSH DEMO TITLE',
      body: 'WEB PUSH DEMO BODY'
    });
    webPush.sendNotification(subscription, payload);
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

app.post('/push-timout', async (req, res) => {
  try {
    const subscription = req.body;
    res.status(200).json({ success: true });

    const payload = JSON.stringify({
      title: 'WEB PUSH DEMO TITLE',
      body: 'WEB PUSH DEMO BODY'
    });

    await timout(5000);
    webPush.sendNotification(subscription, payload);
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => console.log(`Server run on PORT=${PORT} PID=${process.pid}`));
