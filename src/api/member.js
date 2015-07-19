var core = require('./core');
var apiRoot = require('./config').apiRoot;
var baseEndpoint =  apiRoot + '/members';

module.exports = {

  all: function() {
    return core.get(baseEndpoint);
  },

  one: function(id) {
    return core.get(baseEndpoint + '/' + id);
  },

  create: function(member) {
    return core.post(baseEndpoint, member)
  },

  update: function(id, member) {
    return core.post(baseEndpoint + '/' + id, member);
  },

  destroy: function(id) {
    core.delete(baseEndpoint + '/' + id);
  }
}