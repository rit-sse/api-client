'use strict';

var qs = require('qs');

function API(core, resource) {
  this.core = core;
  this.resource = resource;
}

API.prototype.all = function all(query, actuallyAll) {
  if (actuallyAll) { // Quick way to get everything unpaginated
    query.page = 1;
    var core = this.core;
    var resource = this.resource;
    return this.core.get(this.resource + '?' + qs.stringify(query))
      .then(function get(results) {
        var pages = Math.ceil(results.total/results.perPage);
        var r = [results];
        for (var i = 2; i <= pages; i++) {
          query.page = i;
          r.push(core.get(resource + '?' + qs.stringify(query)));
        }
        return Promise.all(r);
      })
      .then(function join(results) {
        return results.reduce(function reduce(data, cur) {
          return data.concat(cur.data);
        }, []);
      });
  }
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
