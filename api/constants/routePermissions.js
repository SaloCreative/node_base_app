const grants = require('./grants');

module.exports = {
  USERS: {
    INDEX: {
      URL: '/users',
      METHOD: {
        GET: grants.USERS.index
      }
    },
    ITEM: {
      URL: '/users/:userId',
      METHOD: {
        GET: grants.USERS.show,
        PUT: grants.USERS.update,
        DELETE: grants.USERS.delete
      }
    }
  },
  GRANTS: {
    INDEX: {
      URL: '/grants',
      METHOD: {
        POST: grants.GRANTS.create,
        DELETE: grants.GRANTS.delete

      }
    },
    ITEM: {
      URL: '/grants/:userId',
      METHOD: {
        GET: grants.GRANTS.index
      }
    }
  }
};