const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');
const bodyParser = require('body-parser');

module.exports = function (io) {


  var urlencodedParser = bodyParser.urlencoded({ extended: false });


  router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render('index', { tweets: tweets });
  });

  router.get('/users/:name', function (req, res) {
    var name = req.params.name;
    var tweets = tweetBank.find({ name: name });
    res.render('index', { tweets: tweets, userNamed: true });
  });

  router.post('/tweets', urlencodedParser, function (req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit('newTweet', {name : text});
    res.redirect('/');
  });

  return router;

}

