const express = require('express');
const app = express();
const chalk = require('chalk');

var verb = chalk.bold.red;
var route = chalk.dim.green;
var special = chalk.italic.magenta;

app.use(function (req, res, next) {

  console.log(verb('%s' + " " + route('%s')), req.method, req.originalUrl);
  console.log(verb('%s ' + route('/ %s')), req.method, res.statusCode);
  next()
});

app.use('/special', function (req, res, next) {

  console.log(special('You reached the special area!'));
  next()
});


app.get('/', function (req, res) {
  res.send('Welcome!')
});

app.get('/news', function (req, res) {
  res.send('This is a news page')
});

app.listen(3000, function () {
  console.log('server listening')
})

