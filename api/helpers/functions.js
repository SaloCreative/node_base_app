
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

exports.buildGrantsToAdd = function (grants, user_id) {
  const grantsArray = [];
  if (grants && grants.length) {
    grants.forEach(function(newGrant) {
      grantsArray.push({
        grant: newGrant,
        user_id: user_id,
        slug_id: newGrant + '.' + user_id
      });
    });
  }
  return grantsArray;
}

exports.buildGrantsToRemove = function (grants, user_id) {
  const grantsArray = [];
  if (grants && grants.length) {
    grants.forEach(function(newGrant) {
      grantsArray.push(newGrant + '.' + user_id);
    });
  }
  return grantsArray;
}