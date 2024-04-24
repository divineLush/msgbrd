const express = require('express');
const db = require('../utils/db');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/new', (req, res, next) => {
  const user = jwt.decode(req.cookies.jwt);
  res.render('new', { user });
});

router.post('/new', passport.authenticate('jwt', { session: false, failureRedirect: '/' }), async (req, res, next) => {
  try {
    const date = `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
    await (await db).collection('posts').insertMany([{ title: req.body.title, post: req.body.post, date }]);
    res.redirect('/');
  } catch(err) {
    next(err);
  }
});

module.exports = router;
