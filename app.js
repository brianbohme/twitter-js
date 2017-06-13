const express = require('express');
const app = express();
const chalk = require('chalk');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

var verb = chalk.bold.red;
var route = chalk.dim.green;
var special = chalk.italic.magenta;


var server = app.listen(3000);
var io = socketio.listen(server);

app.use(express.static('public'));

app.use('/', routes(io));

app.use(function (req, res, next) {

  console.log(verb('%s' + " " + route('%s')), req.method, req.originalUrl);
  console.log(verb('%s ' + route('/ %s')), req.method, res.statusCode);
  next()
});


app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

