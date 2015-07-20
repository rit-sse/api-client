var req = require('superagent');
var url = require('url');

function request(apiRoot, resource, method, body) {
  return req(method, url.resolve(apiRoot, resource))
    .type('json')
    .accept('json')
    .send(body);
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
