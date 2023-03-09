// This download does not include the node_modules folder
// REMEMBER TO RUN "npm install" first, to tell NPM to download the needed packages
const express = require("express");
const app = express();

// app.use((req, res) => {
//     console.log("WE GOT A NEW REQUEST!!")
//     res.send('<h1>This is my webpage!</h1>')
// })


app.get('/', (req, res) => {
    res.send('Welcome to the home page!')
})

/* 경로 매개변수(Route parameters) 설정하기
    콜론(:)을 통해 매개변수를 지정할 수 있다.
    만약 Route path가 /users/:userId/books/:bookId 이고,
    요청한 URI가 http://localhost:3000/user/34/books/8989이면
    req.params의 값은 {"userId":"34","bookId":"8989"}가 된다.
*/
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`)
})

app.post('/cats', (req, res) => {
    res.send('POST REQUEST TO /cats!!!! THIS IS DIFFERENT THAN A GET REQUEST!')
})

app.get('/cats', (req, res) => {
    res.send('MEOW!!')
})

app.get('/dogs', (req, res) => {
    res.send('WOOF!')
})
app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send('NOTHING FOUND IF NOTHING SEARCHED!')
    } else {
        res.send(`<h1>Search results for: ${q}</h1>`)
    }
})

app.get('*', (req, res) => {
    res.send(`I don't know that path!`)
})




// /cats => 'meow'
// /dogs => 'woof'
// '/' 



app.listen(8080, () => {
    console.log("LISTENING ON PORT 8080")
})
