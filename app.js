var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('127.0.0.1:27017/mDb');


// var User = require('./middleware/users');
var sess = require('./middleware/session')



var app = express();

//API Middleware

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// app.set('view options', { locals: { scripts: ['jquery.js'] } })

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: 'roo',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  req.db = db;
  console.log('Logged in :', (req.user?req.user.name:"False"))
  // if (req.path !== '/login' && req.user === undefined) {
  //   res.redirect('/login')
  //   // res.send(401);
  // }
  next();
})

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  let User = db.get('users');
  User.findOne({_id:id}, function (err, user) {
    done(err, user);
  });
});



passport.use(new LocalStrategy(
  function (username, password, done) {
    let User = db.get('users');
    User.findOne({
      username: username
    }, function (err, user) {
      user.validPassword = function validPassword(pass){
        return this.password === pass;
      }
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log('Incorrect username.')
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        console.log('Incorrect password.')
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      console.log(user)
      return done(null, user);
    });
  }
));

app.use('/api',  require('./routes/api'));
app.use('/*',  require('./routes/index'));

app.use('/login', require('./routes/login'));
// app.use('/users', require('./routes/users'));

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;