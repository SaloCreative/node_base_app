'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

const response = require('../helpers/response');
const config = require('../constants/config');
const mailgun = require('../email/mailgun');

exports.request_new_password = function(req, res) {
  if (req.body && req.body.email_address) {
    const passwordResetToken = jwt.sign({ email_address: req.body.email_address }, config.JWT.email_verify);
    User.findOneAndUpdate({ email_address: req.body.email_address }, { reset_token: passwordResetToken }, { new: true }, function(err, user) {
      if (!err && user) {
        mailgun.sendResetEmail(user);
      }
    });
    return res.status(200).send(response.build_response(200, 'success', 'If your email is registered you will receive a reset '));
  }
  return res.status(400).send(response.build_response(400, 'error', 'Unable to process password reset request'));
}

exports.reset_password = function(req, res) {
  let token;
  if (req.body.reset_token && req.body.password) {
    const password = bcrypt.hashSync(req.body.password, 10);
    try {
       token = jwt.verify(req.body.reset_token, config.JWT.email_verify);
    } catch(err) { /* Token error catch */ }
    if (token) {
      return User.findOneAndUpdate({ email_address: token.email_address }, { hash_password: password }, function(err, user) {
        if (!err && user) {
          return res.status(200).send(response.build_response(200, 'success', 'Your password was successfully updated'));
        }
        return res.status(400).send(response.build_response(400, 'error', 'Unable to update password'));
      });
    }
  }
  return res.status(422).send(response.build_response(422, 'error', 'Some required fields are missing. Make sure to send a reset_token and a password field.'));
}