const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, '/views'));
app.set('view-engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'svelte',
        comment: '왜 우리랑 할때만 잘하냐고!!!'
    },
    {
        id: uuid(),
        username: 'React',
        comment: '아무래도 내가 1황이라고 할 수 있지'
    },
    {
        id: uuid(),
        username: 'Vuejs',
        comment: '스타트업 중에 Vuejs를 쓰는 곳도 많던데'
    },
    {
        id: uuid(),
        username: 'Angular',
        comment: '대 - 상 - 혁'
    }
]

/* CRUD: 댓글 전체 조회하기 */
app.get('/comments', (req, res) => {
    res.render('comments/index.ejs', { comments });
});

/* CRUD: 댓글 생성하기 */
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
});

/* CRUD: 댓글 생성 폼 */
app.get('/comments/new', (req, res) => {
    res.render('comments/new.ejs');
});

/* CRUD: 댓글 조회하기 */
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show.ejs', { comment }) // 이름은 상관없다. details, expanded...
})

/* CRUD: 댓글 수정하기 */
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments'); //리다이렉트
})

/* CRUD: 댓글 수정 폼 */
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit.ejs', { comment });
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    // 페이크 데이터 배열을 필터링. 배열을 변형하지 않는다는 장점. 
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/getpost.html');
    // res.render('/getpost');
})

// app.get('/tacos', (req,res) => {
//     res.send('GET /tacos response')
// })

// app.post('/tacos', (req,res) => {
//     const { meat, qty } = req.body;
//     res.send(`OK, hear are ur ${qty} ${meat} tacos`);
// })

app.listen(3000, () => {
    console.log('ON PORT 3000')
})


