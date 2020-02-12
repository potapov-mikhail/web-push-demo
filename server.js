const path = require('path');
const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');

const PORT = 5000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server run on PORT=${PORT} PID=${process.pid}`));
