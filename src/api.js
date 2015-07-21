function API(core, resource) {
  this.core = core;
  this.resource = resource;
}

API.prototype.all = function(query, callback) {
  // Manipulating arguments so that a user doesn't have to pass in
  // a query object if they are not using it
  if(arguments.length === 1) {
    callback = query;
    query = {};
  }
  return this.core
    .get(this.resource)
    .query(query)
    .end(callback);
}

API.prototype.one = function(id, query, callback) {
  // Manipulating arguments so that a user doesn't have to pass in
  // a query object if they are not using it
  if(arguments.length === 2) {
    callback = query;
    query = {};
  }

  return this.core
    .get(this.resource + '/' + id)
    .query(query)
    .end(callback);
}

API.prototype.create = function(body, callback) {
    return this.core
    .post(this.resource, body)
    .end(callback);
}

API.prototype.update = function(id, body, callback) {
  return this.core
    .put(this.resource + '/' + id, body)
    .end(callback);
}

API.prototype.destroy = function(id, callback) {
  return this.core
    .delete(this.resource + '/' + id)
    .end(callback);
}

module.exports = API