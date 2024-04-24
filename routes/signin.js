const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../utils/db');
const bcrypt = require('bcrypt');

require('dotenv').config();

router.get('/signin', (req, res, next) => {
  const user = jwt.decode(req.cookies.jwt);
  if (user) {
    res.redirect('/');
  } else {
    res.render('signin');
  }
});

router.post('/signin', async (req, res, nex) => {
  const { username, password } = req.body;

  const user = (await (await db).collection('users').find({ username }).toArray()).shift();
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign(
    user,
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );

  const posts = await (await db).collection('posts').find({}).toArray();
  res.cookie('jwt', token);
  res.render('index', { posts, token });
});

module.exports = router;
