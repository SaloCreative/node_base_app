'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const Grant = mongoose.model('Grant');

const response = require('../helpers/response');
const permissions = require('../constants/routePermissions');
const helperFunctions = require('../helpers/functions');
const config = require('../constants/config');

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
      }, config.JWT.auth_sign, { expiresIn: 60 * 60 * 24 });

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

/* PERMISSIONS AND AUTH CHECKS */

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