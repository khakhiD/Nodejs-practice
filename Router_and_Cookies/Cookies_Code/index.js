const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

app.use(cookieParser('thisismysecret'));

app.get('/getsignedcookie', (req, res) => {
	res.cookie('fruit', 'grape', { signed: true });
    res.send('SIGNED YOUR FRUIT COOKIE');
})

app.get('/verifyfruit', (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(req.signedCookies);
})

app.get('/greet', (req, res) => {
    const { name = 'No-name'} = req.cookies;
    res.send(`HEY there, ${name}`);
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'henrietta');
    res.cookie('animal', 'harlequin shrimp');
    res.send('OK SENT YOU A COOKIE');
})

app.listen(3000, () => {
    console.log('SERVING ON PORT 3000');
})