'use strict';

module.exports = function(app) {
  const grantCtr = require('../controllers/grantController');
  const authHandlers = require('../controllers/authController.js');

  app.route('/grants/:userId')
    .get(authHandlers.grantsRequired, grantCtr.get_user_grants)
    .post(grantCtr.add_grant)
    .delete(grantCtr.remove_grant);

};