const express = require("express");
const app = express();
const redditData = require('./data.json');

/* path 모듈은 Node.js에 내장된 기본 모듈로, 운영체제에 따른 디렉토리 구조의
    문자열 차이에 대한 에러 위험을 줄여줄 수 있다.
    join() 함수는 여러 개의 문자열을 가변 인자로 받아 하나의 완전한 경로로 조합해준다. */
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get('/r/:subreddit', (req,res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if(data){
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit })
    }
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ];
    res.render('cats', { allCats: cats });
})

app.get("/rand", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random", { num });
});

app.listen(8080, () => {
  console.log("LISTENING ON PORT 8080");
});
