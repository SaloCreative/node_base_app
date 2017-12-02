'use strict';

const response = require('../helpers/response');
const config = require('../constants/config');

exports.details = function(req, res) {
    return res.json(response.build_response(200, 'success', 'API running', config.API));
};