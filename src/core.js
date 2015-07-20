require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');
var url = require('url');

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function json(response) {
  return response.json();
}

function request(apiRoot, resource, method, body) {
  return fetch(url.resolve(apiRoot, resource), {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(status)
    .then(json);
}

module.exports = function(apiRoot) {

  this.get = function(resource) {
    return request(apiRoot, resource, 'get');
  }

  this.post = function(resource, body) {
    return request(apiRoot, resource, 'post', body);
  }

  this.put = function put(resource, body) {
    return request(apiRoot, resource, 'put', body);
  }

  this.delete = function(resource) {
    return request(apiRoot, resource, 'delete');
  }
}
