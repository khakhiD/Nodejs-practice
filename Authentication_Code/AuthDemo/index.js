const User = require('./models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('veiws', 'views');
app.use(express.urlencoded({extended: true}));
app.use(session({ secret: 'abcdefg', resave: false, saveUninitialized: false }));

main().catch((err) => {
    console.log(`[MONGO DB 연결 실패] ${err}`)
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/authDemo");
  console.log("[MONGO DB 연결 성공]");
}

const requiredLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}

app.get('/', (req, res) => {
    res.send('home');
})

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }
})

app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // const hash = await bcrypt.hash(password, 12);
    const user = new User({ username, password });
    await user.save();
    // 가입하고 나서 로그인 상태를 유지하도록 세션에 id를 저장한다.
    req.session.user_id = user._id;
    res.redirect('/');
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/login');
})

app.get('/secret', requiredLogin, (req, res) => {
    res.render('secret.ejs');
})

app.get('/topsecret', requiredLogin, (req, res) => {
    res.send('top secret');
})

app.listen(3000, () => {
    console.log('SEVER ON');
})