const express = require('express');
const db = require('../utils/db');
const router = express.Router();
const passport = require('passport');

router.get('/new', (req, res, next) => {
  res.render('new', { title: 'msgbrd' });
});

router.post('/new', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const date = `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
    await (await db).collection('posts').insertMany([{ title: req.body.title, post: req.body.post, date }]);
    res.redirect('/');
  } catch(err) {
    next(err);
  }
});

module.exports = router;
