const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../utils/db');

router.get('/signin', (req, res, next) => {
  res.render('signin', { title: 'msgbrd' });
});

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));

module.exports = router;
