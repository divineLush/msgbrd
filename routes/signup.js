const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'msgbrd' });
});

router.post('/signup', async (req, res, next) => {
  try {
    const { name, pswd } = req.body;
    await (await db).collection('users').insertMany([{ name, pswd }]);
    res.redirect('/');
  } catch(err) {
    next(err);
  }
});

module.exports = router;
