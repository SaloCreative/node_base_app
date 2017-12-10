'use strict';

module.exports = function(app, db) {
  const authHandlers = require('../controllers/authController.js');

  app.route('/auth/login')
    .post(authHandlers.sign_in);

  app.route('/auth/validate')
    .get(authHandlers.validate);

  app.route('/auth/password/request')
    .post(authHandlers.request_new_password);

  app.route('/auth/password/reset')
    .post(authHandlers.reset_password);
};