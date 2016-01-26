'use strict';

var url = require('url');
require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
}

function json(response) {
  if (response.status === 204) {
    return Promise.resolve({});
  }
  return response.json();
}

function Core(apiRoot) {
  this.apiRoot = apiRoot;
  if (typeof localStorage !== 'undefined') {
    this.token = localStorage.getItem('jwt');
  }
}

Core.prototype.request = function request(resource, method, body) {
  return fetch(url.resolve(this.apiRoot, resource), {
    method: method,
    headers: {
      Authorization: 'Bearer ' + this.token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(status)
    .then(json);
};

Core.prototype.get = function get(resource) {
  return this.request(resource, 'get');
};

Core.prototype.post = function post(resource, body) {
  return this.request(resource, 'post', body);
};

Core.prototype.put = function put(resource, body) {
  return this.request(resource, 'put', body);
};

Core.prototype.delete = function del(resource) {
  return this.request(resource, 'delete');
};

module.exports = Core;
