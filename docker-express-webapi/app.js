var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var timeEvents = require('./routes/timeEvents');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/users', users);
app.use(function(req,res,next){setTimeout(next,2000)}); //Add delay to timeEvent
app.use('/api/timeEvents', timeEvents); 
app.use(function(req,res,next){setTimeout(next,0)}); //Remove delay
//not timeEvents but api/timeEvents, this is for dev server's understanding that it will use proxy in package.json '"proxy": "http://localhost:3001"'
//in react app: componentDidMount() {
//     this.fetchData('/api/timeEvents'); // starts from '/api/', will proxy the request to localhost:3001, and query our /api/timeEvents 
// }
//Proxying API Requests in Development: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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