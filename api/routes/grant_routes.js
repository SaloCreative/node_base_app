'use strict';

module.exports = function(app) {
  const grantCtr = require('../controllers/grantController');
  const authHandlers = require('../controllers/authController.js');

  app.route('/grants')
    .post(authHandlers.grantsRequired, grantCtr.add_grant)
    .delete(authHandlers.grantsRequired, grantCtr.remove_grant);

  app.route('/grants/:userId')
    .get(authHandlers.grantsRequired, grantCtr.get_user_grants)

};