'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');
const Grant = mongoose.model('Grant');

const response = require('../helpers/response');
const permissions = require('../constants/routePermissions');
const helperFunctions = require('../helpers/functions');
const config = require('../constants/config');
const mailgun = require('../email/mailgun');

exports.sign_in = function(req, res) {
  User.findOne({ email_address: req.body.email_address }, function(err, user) {
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).send(response.build_response(401, 'error', 'Authentication failed. Invalid email or password.'));
    }

    var grants = [];

    Grant.find({ user_id: user._id }, function(err, grant) {
      if (!err && grant){
        grant.forEach(function (grant) {
          grants.push(grant.grant);
        });
      }

      const token = jwt.sign({
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          email_address: user.email_address,
          _id: user._id
        },
        grants: grants
      }, config.JWT.auth_sign);

      return res.json(response.build_response(200, 'success', 'Successfully logged in',
      {
        user: {
          first_name: user.first_name,
          last_name: user.last_name,
          email_address: user.email_address,
          _id: user._id
        },
        grants: grants,
        token: token
      }
    ));
  });
});
};

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
  return res.status(400).send(response.build_response(400, 'error', 'Unable to update password'));
}

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).send(response.build_response(401, 'error', 'Unauthorized user!'));
  }
};

exports.currentUserRequired = function(req, res, next) {
  if (req.user) {
    const routePermissions = helperFunctions.findRoutePermissions(permissions, 'URL', req.route.path)['METHOD'][req.method];
    const hasPermission = helperFunctions.hasPermissions(req.user.grants, routePermissions);
    if (hasPermission || req.params.userId === req.user.data._id) {
      next();
    } else {
      return res.status(403).send(response.build_response(403, 'error', 'Not authorized to do this!'));
    }
  } else {
    return res.status(401).send(response.build_response(401, 'error', 'Unauthorized user!'));
  }
};

exports.grantsRequired = function(req, res, next) {
  if (req.user) {
    const routePermissions = helperFunctions.findRoutePermissions(permissions, 'URL', req.route.path)['METHOD'][req.method];
    const hasPermission = helperFunctions.hasPermissions(req.user.grants, routePermissions);
    if (hasPermission) {
      next();
    } else {
      return res.status(403).send(response.build_response(403, 'error', 'Not authorized to do this!'));
    }
  } else {
    return res.status(401).send(response.build_response(401, 'error', 'Unauthorized user!'));
  }
};