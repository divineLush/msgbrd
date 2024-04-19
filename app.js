const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");

const indexRouter = require('./routes/index');
const newRouter = require('./routes/new');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('./utils/db');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);
app.use(newRouter);
app.use(signinRouter);
app.use(signupRouter);

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.session());

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = (await (await db).collection('users').find({ username, password }).toArray()).shift();
      console.log(username, password, user);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };

      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      };

      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
);

module.exports = app;
