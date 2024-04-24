const express = require('express');
const router = express.Router();

router.get('/signout', (req, res, next) => {
  res.clearCookie('jwt');
  res.redirect('/');
});

module.exports = router;
