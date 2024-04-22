const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const bcrypt = require('bcrypt');

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'msgbrd' });
});

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    await (await db).collection('users').insertMany([{ username, password: passwordHash }]);
    res.redirect('/');
  } catch(err) {
    next(err);
  }
});

module.exports = router;
