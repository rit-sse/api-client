module.exports = function(core, resource) {

  this.all = function(query, callback) {
    // Manipulating arguments so that a user doesn't have to pass in
    // a query object if they are not using it
    if(arguments.length === 1) {
      callback = query;
      query = {};
    }
    return core
      .get(resource)
      .query(query)
      .end(callback);
  }

  this.one = function(id, query, callback) {
    // Manipulating arguments so that a user doesn't have to pass in
    // a query object if they are not using it
    if(arguments.length === 2) {
      callback = query;
      query = {};
    }

    return core
      .get(resource + '/' + id)
      .query(query)
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
