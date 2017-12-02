'use strict';

module.exports = function(app) {
	const usersCtr = require('../controllers/userController');
	const authHandlers = require('../controllers/authController.js');

	app.route('/users')
		.get(authHandlers.loginRequired, usersCtr.list_all_users)
		.post(usersCtr.register);

	app.route('/users/:userId')
		.get(authHandlers.currentUserRequired, usersCtr.show_user)
		.put(authHandlers.currentUserRequired, usersCtr.update_user)
		.delete(authHandlers.currentUserRequired, usersCtr.delete_user)
};