module.exports = {
  USERS: {
    index: [ 'users.admin', 'users.index' ],
    create: [ 'users.admin', 'users.create' ],
    show: [ 'users.admin', 'users.read' ],
    update: [ 'users.admin', 'users.update' ],
    delete: [ 'users.admin', 'users.delete' ],
    admin: [ 'users.admin' ]
  },
  GRANTS: {
    index: [ 'grants.admin', 'grants.read' ],
    create: [ 'grants.admin', 'grants.create' ],
    delete: [ 'grants.admin', 'grants.delete' ],
    admin: [ 'grants.admin' ]
  }
};