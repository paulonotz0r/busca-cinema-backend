var express = require('express');
var utilsModule = require('./utils');
var utils = utilsModule();
var app = express();
var baseUrl = 'https://www.tribute.ca';
var port = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return next();
});

app.get('/', function (req, res) {
  res.send('Hello this is the busca-cinema-backend :)');
});

app.get('/movies', function (req, res) {
  utils
    .getMovies()
      .then((r) => {
        res.send(r);
      })
      .catch((err) => {
        res.send({ error: "Couldn't get the movies." });
      });
});

app.get('/theaters/:cityId', function (req, res) {
  utils
    .getTheaters(req.params.cityId)
      .then((r) => {
        res.send(r);
      })
      .catch((err) => {
        res.send({ error: "Couldn't get the theaters." });
      });
});

app.get('/sessions/:theaterId', function (req, res) {
  utils
    .getSessionsByTheater(req.params.theaterId)
      .then((r) => {
        res.send(r);
      })
      .catch((err) => {
        res.send({ error: "Couldn't get the sessions." });
      });
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});