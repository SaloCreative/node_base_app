'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const compression = require('compression');

const User = require('./api/models/userModel');
const Grant = require('./api/models/grantModel');
const Notification = require('./api/models/notificationModel');
const response = require('./api/helpers/response');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth_app', {
  useMongoClient: true
});

app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function hostIsInWhitelist(host) {
  const whitelist = ['http://localhost:8000', 'http://localhost:8080'];
  const index = whitelist.indexOf(host);
  return whitelist[index];
}

app.use(function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', hostIsInWhitelist(req.headers.origin));
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Cache-Control, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'secret', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

const routes = require('./api/routes/index');
routes(app);

app.use(function(req, res) {
  res.status(404).send(
    response.build_response(404, 'Not found', 'The requested resource not found')
  )
});

app.listen(port);

console.log('Node RESTful API server started on: ' + port);

module.exports = app;