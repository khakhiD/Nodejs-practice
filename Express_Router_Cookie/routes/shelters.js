const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('MAIN PAGE');
})

router.get('/shelters', (req, res) => {
    res.send('ALL SHELTERS');
})

router.post('/shelters', (req, res) => {
    res.send('CREATING SHELTE');
})

router.get('/shelters/:id', (req, res) => {
    res.send('VIEWING ONE SHELTER');
})

router.get('/shelters/:id/edit', (req, res) => {
    res.send('EDITING ONE SHELTER');
})

module.exports = router;