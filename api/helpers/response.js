exports.build_response = function(code, status, message, body) {
  return response = {
    code: code,
    status: status,
    message: message,
    response: body
  };
};