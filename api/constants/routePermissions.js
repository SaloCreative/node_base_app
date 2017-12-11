const grants = require('./grants');

module.exports = {
  USERS: {
    LIST: {
      URL: '/users',
      METHOD: {
        GET: grants.USERS.index
      }
    },
    USER: {
      URL: '/users/:userId',
      METHOD: {
        GET: grants.USERS.show,
        PUT: grants.USERS.update,
        DELETE: grants.USERS.delete
      }
    }
  },
  GRANTS: {
    USER: {
      URL: '/grants/:userId',
      METHOD: {
        POST: grants.GRANTS.create,
        DELETE: grants.GRANTS.delete,
        GET: grants.GRANTS.show
      }
    }
  }
};