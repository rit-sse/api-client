module.exports = function(core, resource) {

  this.all = function(query, callback) {
    return core
      .get(resource)
      .query(query)
      .end(callback);
  }

  this.one = function(id, callback) {
    return core
      .get(resource + '/' + id)
      .end(callback);
  }

  this.create = function(body, callback) {
    return core
      .post(resource, body)
      .end(callback);
  }

  this.update = function(id, body, callback) {
    return core
      .put(resource + '/' + id, body)
      .end(callback);
  }

  this.destroy = function(id, callback) {
    return core
      .delete(resource + '/' + id)
      .end(callback);
  }
}