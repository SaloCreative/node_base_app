'use strict';

module.exports = function(app, db) {
  const authHandlers = require('../controllers/authController.js');

  app.route('/auth/login')
    .post(authHandlers.sign_in);
};