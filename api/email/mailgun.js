const config = require('../constants/config');
const mailgun = require('mailgun-js')({ apiKey: config.MAILGUN.api_key, domain: config.MAILGUN.domain });

exports.sendRegistrationEmail = function(user) {
  var data = {
    from: config.EMAILS.registration_address,
    to: 'rich@salocreative.co.uk',
    subject: 'Thanks for registering',
    text: 'Testing some Mailgun awesomness!'
  };
  
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

exports.sendResetEmail = function(user) {
  var data = {
    from: config.EMAILS.reset_address,
    to: 'rich@salocreative.co.uk',
    subject: 'Reset password',
    text: 'Testing some Mailgun awesomness!'
  };
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}