'use strict';

var qs = require('qs');

function API(core, resource) {
  this.core = core;
  this.resource = resource;
}

API.prototype.all = function all(query) {
  return this.core.get(this.resource + '?' + qs.stringify(query));
};

API.prototype.one = function one(id) {
  return this.core.get(this.resource + '/' + id);
};

API.prototype.create = function create(body) {
  return this.core.post(this.resource, body);
};

API.prototype.update = function update(id, body) {
  return this.core.put(this.resource + '/' + id, body);
};

API.prototype.destroy = function destroy(id) {
  return this.core.delete(this.resource + '/' + id);
};

module.exports = API;
