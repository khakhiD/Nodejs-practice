const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    }
    res.send('SORRY NOT AN ADMIN!');
})

router.get('/topsecret', (req, res) => {
    res.send('THIS IS TOP SECERET');
})

router.get('/deleteeverything', (req, res) => {
    res.send('DELETED IT ALL!');
})

module.exports = router;