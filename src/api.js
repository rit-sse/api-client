module.exports = function(core, resource) {

  this.all = function() {
    return core.get(resource);
  }

  this.one = function(id) {
    return core.get(resource + '/' + id);
  }

  this.create = function(body) {
    return core.post(resource, body)
  }

  this.update = function(id, body) {
    return core.post(resource + '/' + id, body);
  }

  this.destroy = function(id) {
    core.delete(resource + '/' + id);
  }
}