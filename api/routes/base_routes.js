'use strict';

module.exports = function(app, db) {
  const base = require('../controllers/baseController.js');

  app.route('/api')
    .get(base.details);
};