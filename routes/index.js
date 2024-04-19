const express = require('express');
const db = require('../utils/db');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await (await db).collection('posts').find({}).toArray();
    res.render('index', { title: 'msgbrd', posts: posts });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
