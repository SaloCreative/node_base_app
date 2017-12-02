
// Find route details by value in nested objects
exports.findRoutePermissions = function (obj, key, value) {
  const keys = Object.keys(obj);
  var result = null;
  keys.forEach(function(model) {
    const routes = Object.keys(obj[model]);
    routes.forEach(function(route) {
      if (obj[model][route][key] === value) {
        result = obj[model][route];
      }
    });
  });
  return result;
};

exports.hasPermissions = function (grants, requiredGrants) {
  return requiredGrants.some(function (v) {
    return grants.indexOf(v) >= 0;
  });
};