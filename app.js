var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('express-flash');
var session = require('express-session');
//
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
// var tasksRouter = require('./routes/tasks');
var cmsRouter = require('./routes/cms');
var cmsPostsRouter = require('./routes/cms_posts');
var cmsCategoryRouter = require('./routes/cms_category');
var cmsPagesRouter = require('./routes/cms_pages');

// API
var apiRouter = require('./routes/api');
var apiCmsPostsRouter = require('./routes/api_cms_posts');
var apiCmsCategoryRouter = require('./routes/api_cms_category');
var apiCmsPagesRouter = require('./routes/api_cms_pages');

var app = express();
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '5mb', extended: true }));
app.use(express.urlencoded({ limit:'5mb' ,extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  next();
});
// CSRF
//express-sessionモジュールを設定する
app.use(session({
  //暗号化に利用するキーを設定
  secret: 'secret key',
  //毎回セッションを作成しない
  resave: false,
  //未初期化状態のセッションを保存しない
  saveUninitialized: false,
  cookie: {
    //生存期間( msec )
    maxAge: 365 * 24 * 60 * 1000,
    //httpsを使用しない
    secure: false
  }
}));
app.use(flash());
//route
app.use('/', indexRouter);
app.use('/login', loginRouter );
app.use('/users', usersRouter);
//app.use('/tasks', tasksRouter );
app.use('/cms', cmsRouter);
app.use('/cms_posts', cmsPostsRouter);
app.use('/cms_category',  cmsCategoryRouter );
app.use('/cms_pages', cmsPagesRouter);

//api
app.use('/api', apiRouter );
app.use('/api_cms_posts', apiCmsPostsRouter );
app.use('/api_cms_category', apiCmsCategoryRouter );
app.use('/api_cms_pages', apiCmsPagesRouter );

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
