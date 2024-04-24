const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { ObjectId } = require('mongodb');

const indexRouter = require('./routes/index');
const newRouter = require('./routes/new');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const signoutRouter = require('./routes/signout');

const passport = require('passport');
const db = require('./utils/db');

const app = express();

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
app.use(signoutRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const jwtFromRequest = (req) =>
  req && req.cookies ? req.cookies['jwt'] : null;

const opts = {
  jwtFromRequest,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    const _id = new ObjectId(jwt_payload._id);
    const user = (await (await db).collection('users').find({ _id }).toArray()).shift();
    done(null, user || false);
}));

app.use(passport.initialize());

module.exports = app;
