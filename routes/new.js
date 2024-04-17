const express = require('express');
const db = require('../utils/db');
const router = express.Router();

router.get('/new', (req, res, next) => {
  res.render('new', { title: 'msgbrd' });
});

router.post('/new', (req, res, next) => {
  console.log(req.body);

  res.redirect('/');
});

module.exports = router;
