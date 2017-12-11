'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const response = require('../helpers/response');
const config = require('../constants/config');

exports.validate = function(req, res) {
  let token;
  if (req.query.token) {
    try {
       token = jwt.verify(req.query.token, config.JWT.email_verify);
    } catch(err) { /* Token error catch */ }
    if (token) {
      return User.findOneAndUpdate({ email_address: token.email_address }, { email_verified: true }, function(err, user) {
        if (err || !user){
          return res.status(400).send(response.build_response(400, 'error', 'Email could not be verified'))
        }
        return res.json(response.build_response(200, 'success', 'Email successfully verified'));
      });
    }
  }
  return res.status(401).send(response.build_response(401, 'error', 'Unauthorized user!'));
}