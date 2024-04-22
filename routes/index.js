const express = require('express');
const db = require('../utils/db');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', async (req, res, next) => {
  try {
    const user = jwt.decode(req.cookies.jwt);
    const posts = await (await db).collection('posts').find({}).toArray();
    res.render('index', { posts, user });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
