'use strict';

module.exports = function(app, db) {
  const authHandlers = require('../controllers/authController.js');
  const accountHandlers = require('../controllers/accountController.js');
  const passwordHandlers = require('../controllers/passwordController.js');

  app.route('/auth/login')
    .post(authHandlers.sign_in);

  app.route('/auth/validate')
    .get(accountHandlers.validate);

  app.route('/auth/password/request')
    .post(passwordHandlers.request_new_password);

  app.route('/auth/password/reset')
    .post(passwordHandlers.reset_password);
};