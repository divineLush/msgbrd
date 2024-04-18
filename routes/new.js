const express = require('express');
const db = require('../utils/db');
const router = express.Router();

router.get('/new', (req, res, next) => {
  res.render('new', { title: 'msgbrd' });
});

router.post('/new', async (req, res, next) => {
  const date = `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
  await (await db).collection('posts').insertMany([{ title: req.body.title, post: req.body.post, date }]);

  res.redirect('/');
});

module.exports = router;
