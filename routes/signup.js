const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/signup', (req, res, next) => {
  const user = jwt.decode(req.cookies.jwt);
  if (user) {
    res.redirect('/');
  } else {
    res.render('signup');
  }
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
