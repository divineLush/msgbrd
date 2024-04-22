const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../utils/db');

router.get('/signin', (req, res, next) => {
  res.render('signin', { title: 'msgbrd' });
});

router.post('/signin', async (req, res, nex) => {
  const { username, password } = req.body;

  const user = (await (await db).collection('users').find({ username }).toArray()).shift();
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  if (password !== user.password) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign(
    user,
    'secret',
    {
      expiresIn: "1h",
    }
  );

  const posts = await (await db).collection('posts').find({}).toArray();
  res.cookie('jwt', token);
  res.render('index', { title: "msgbrd", posts, token });
});

module.exports = router;
