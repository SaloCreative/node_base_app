function buildConfig() {
  var config = {
    API: {
      version: '0.0.1',
      name: 'Node API',
      last_updated: '2017-12-02 21:24:45 GMT',
      url: process.env.API_URL,
    },
    JWT: {
      auth_sign: process.env.JWT_AUTH_SIGN,
      email_verify: process.env.JWT_EMAIL_VERIFY
    },
    MAILGUN: {
      domain:  process.env.MAILGUN_DOMAIN,
      api_key: process.env.MAILGUN_API_KEY
    },
    REGISTRATION: {
      from_address: `Registrations | Node App <registration@${ process.env.API_URI }>`
    }
  }
  return config;
};

module.exports = buildConfig();