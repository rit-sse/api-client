var req = require('superagent');
var url = require('url');

function request(apiRoot, resource, method, body) {
  return req(method, url.resolve(apiRoot, resource))
    .type('json')
    .accept('json')
    .send(body);
}

function Core(apiRoot) {
  this.apiRoot = apiRoot;
}

Core.prototype.get = function(resource) {
  return request(this.apiRoot, resource, 'get');
}

Core.prototype.post = function(resource, body) {
  return request(this.apiRoot, resource, 'post', body);
}

Core.prototype.put = function put(resource, body) {
  return request(this.apiRoot, resource, 'put', body);
}

Core.prototype.delete = function(resource) {
  return request(this.apiRoot, resource, 'delete');
}

module.exports = Core;
