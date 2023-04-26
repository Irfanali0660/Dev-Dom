var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')
let mongoose=require('mongoose')
var env=require('dotenv')
env.config();
const socketio = require('socket.io');
const chatSocket = require('./controller/socket/socket');

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

var app = express();

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('Database connected... ['+process.env.MONGO_URL+']')
  // next()
}).catch((err)=>{
  console.log(err)
  // next(createError(500))
})

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET, POST, PUT ,DELETE,PATCH',
  allowedHeaders: 'Content-Type, Authorization',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// view engine setup
app.use(cors(corsOptions))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/users', usersRouter);

function initSocketIo(server){
  const io_liveChats = socketio(server,{
    cors:corsOptions,
    path: '/singlepost'
  });
  const ios = io_liveChats
  chatSocket.chatMessages(ios)
}

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

module.exports ={app,initSocketIo};
