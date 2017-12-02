'use strict';

const mongoose = require('mongoose');
const Grant = mongoose.model('Grant');
const response = require('../helpers/response');

exports.add_grant = function(req, res) {
  Grant.insertMany(req.body, { ordered: false }, function(err, grant) {
    if (err) {
      if (err.code !== 11000) {
        return res.status(400).send(response.build_response(400, 'error', err));
      } else {
        return res.status(400).send(response.build_response(400, 'error', 'Some grants already exist and couldn\'t be added'));
      }
    } else {
      return res.json(response.build_response(200, 'success', 'Grants successfully added', grant));
    }
  });
};

exports.remove_grant = function(req, res) {
  Grant.deleteMany({ slug_id: { $in: req.body } }, function(err, grant) {
    if (err) {
      return res.status(400).send(response.build_response(400, 'error', err));
    } else {
      return res.json(response.build_response(200, 'success', 'Grants successfully removed', grant));
    }
  });
};

exports.get_user_grants = function(req, res) {
  Grant.find({ user_id: req.params.userId }, function(err, grant) {
    if (err || !grant){
      return res.status(400).send(response.build_response(400, 'error', err))
    }
    res.json(response.build_response(200, 'success', 'User grants list successfully fetched', grant));
  });
};