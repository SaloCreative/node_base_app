const baseRoutes = require('./base_routes');
const usersRoutes = require('./users_routes');
const authRoutes = require('./auth_routes');
const grantRoutes = require('./grant_routes');

module.exports = function(app, db) {
  baseRoutes(app, db);
  usersRoutes(app, db);
  authRoutes(app, db);
  grantRoutes(app, db);
};