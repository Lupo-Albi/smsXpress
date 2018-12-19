// Adicionando a biblioteca de Promises bluebird
var bluebird = require('bluebird');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');

// Adicionando a biblioteca  BodyParser
var bodyParser = require('body-parser');

// Adicionando o pacote Mongoose
var mongoose = require('mongoose');
mongoose.Promise = bluebird;

// Trazendo a rota da API
var apiRouter = require('./routes/api.route');

var app = express();

// Conexão com o Database
// URI de conexão para o DB 
var uri = 'mongodb://root:abc123@ds161146.mlab.com:61146/smsxpress';

// Opções passadas para o driver do MongoDB
var options =
{
  useNewUrlParser: true,
}

// Método para conectar com o DB, juntamente com o tratamento de sua Promise 
mongoose.connect(uri, options)
.then(() => { console.log(`Conexão com o banco de dados realizada com sucesso`) })
.catch(() => { console.log(`Erro ao conectar ao bando de dados do MongoDB`) });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist/smsXpress-angular')));
app.use('/', express.static(path.join(__dirname, 'dist/smsXpress-angular')));

// Usando as rotas da API para as rotas que corresponderem a /api
app.use('/api', apiRouter);

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
  res.send(err.status);
});

module.exports = app;