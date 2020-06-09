var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var session = require('express-session');
var passport = require('passport');
const uuid = require('uuid');
var TwitterStrategy = require('passport-twitter').Strategy;
// モデルの読み込み
var User = require('./models/user');
var Result = require('./models/result');

User.sync();
Result.sync();

var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || '114514';
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || '114514';

var app = express();
app.use(helmet());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: '3ef868fd736ff7fa' ,resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/logout', function(req, res){
  console.log("logout");
  req.logout();
  res.redirect('/');
});

app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// passport-twitterの設定
passport.use(new TwitterStrategy(
{
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: 'https://jankenonline2.herokuapp.com/auth/twitter/callback'
},
// 認証後の処理
function(token, tokenSecret, profile, done) {
  const userId = uuid.v4();
  const twitterUserId = profile.id;
  const username = profile.username;
  //const Id_str = twitterUserId.toString();
  console.log("***" + username + " さん" + "TWITTER ID:" + profile.id_str)
  process.nextTick(function () {
      console.log(profile.id_str + "を探します");
      User.findOne({
        where: {userTwitterId: profile.id_str}
        }
      ).then((userdata) => {
        console.log("user id" + profile.id_str)
        if(!userdata || userdata.length == 0){//ユーザー登録されていない
          console.log(profile.username + "さん" + "初めまして!");
          User.upsert({
            userId: userId,
            userTwitterId: profile.id_str,
            username: profile.username
          })
          Result.upsert({
            userId: userId,
            userTwitterId: profile.id_str,
            win: 0,
            lose: 0,
            draw: 0,
            gu: 0,
            choki: 0,
            pa: 0
          })
        }else{
          console.log(profile.username + "さんこんにちは!");
        }
      }).then(() => {
        done(null, profile);
      })
  });
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/?auth_failed' }),
  function (req, res) {
    res.redirect('/');
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
