function selectJWTKey(env = 'development') {
  switch (env) {
    case 'production':
      return ''
    case 'staging':
      return ''
    default:
      return 'nodAppDevKey4JwTT0k3n'
  }
}

module.exports = {
  API: {
    version: '0.0.1',
    name: 'Node API',
    last_updated: '2017-12-02 21:24:45 GMT'
  },
  JWT_KEY: selectJWTKey()
};