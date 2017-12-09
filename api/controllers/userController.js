'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const response = require('../helpers/response');
const config = require('../constants/config');
const mailgun = require('../email/mailgun');

exports.register = function(req, res) {
  var newUser = new User(req.body);
  var password = req.body.password;
  if (password) {
    password = bcrypt.hashSync(password, 10);
  }
  newUser.hash_password = password;
  newUser.verify_token = jwt.sign({ email_address: newUser.email_address }, config.JWT.email_verify);
  newUser.save(function(err, user) {
    if (err) {
      var message = err;
      // Check if we have a duplicate key conflict
      if (err.code === 11000) {
        message = { errors: { email_address : { message: 'Email address already taken' } } }
      }
      return res.status(400).send(response.build_response(400, 'error', message));
    } else {
      mailgun.sendRegistrationEmail(user);
      return res.json(response.build_response(200, 'success', 'User successfully registered', user));
    }
  });
};

exports.list_all_users = function(req, res) {
  var query = User.find({}).select('first_name last_name role');
  query.exec(function (err, user) {
    if (err || !user){
      return res.status(400).send(response.build_response(400, 'error', err))
    }
    res.json(response.build_response(200, 'success', 'User list successfully fetched', user));
  });
};

exports.show_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err || !user){
      return res.status(404).send(response.build_response(404, 'error', 'User not found'))
    }
    res.json(response.build_response(200, 'success', 'User successfully fetched', user));
  });
};

exports.update_user = function(req, res) {
  const newUser = req.body;
  newUser.last_modified = new Date();
  User.findOneAndUpdate({ _id: req.params.userId }, newUser, { runValidators: true, new: true }, function(err, user) {
    if (err || !user){
      var errCode = 404,
          message = 'User not found';
      if (err && err.kind !== 'ObjectId') {
        errCode = 400;
        message = err;
        // Check if we have a duplicate key conflict
        if (err.code === 11000) {
          message = { errors: { email_address : { message: 'Email address already taken' } } }
        }
      }
      return res.status(errCode).send(response.build_response(errCode, 'error', message))
    }
    res.json(response.build_response(200, 'success', 'User successfully updated', user));
  });
};

exports.delete_user = function(req, res) {
  User.findByIdAndRemove(req.params.userId, function(err, user) {
    if (err) {
      return res.status(400).send(response.build_response(400, 'error', 'User could not be deleted'));
    }
    res.json(response.build_response(200, 'success', 'User successfully deleted', user));
  });
};