const express = require('express')
const path = require('path');
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, '/views'));
app.set('view-engine', 'ejs');

const comments = [
    {
        id: 1,
        username: 'svelte',
        comment: '왜 우리랑 할때만 잘하냐고!!!'
    },
    {
        id: 2,
        username: 'React',
        comment: '아무래도 내가 1황이라고 할 수 있지'
    },
    {
        id: 3,
        username: 'Vuejs',
        comment: '스타트업 중에 Vuejs를 쓰는 곳도 많던데'
    },
    {
        id: 4,
        username: 'Angular',
        comment: '대 - 상 - 혁'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index.ejs', { comments });
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new.ejs');
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment });
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === parseInt(id));
    // console.log(comment)
    res.render('comments/show.ejs', { comment }) // 이름은 상관없다. details, expanded...
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/getpost.html');
    // res.render('/getpost');
})

app.get('/tacos', (req,res) => {
    res.send('GET /tacos response')
})

app.post('/tacos', (req,res) => {
    const { meat, qty } = req.body;
    res.send(`OK, hear are ur ${qty} ${meat} tacos`);
})

app.listen(3000, () => {
    console.log('ON PORT 3000')
})


