const express = require('express');
const router = express.Router();

router.get('/signin', (req, res, next) => {
  res.render('signin', { title: 'msgbrd' });
});

router.post('/signin', async (req, res, next) => {
  res.redirect('/');
});

module.exports = router;
