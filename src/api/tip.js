var core = require('./core');
var apiRoot = require('./config').apiRoot;
var baseEndpoint = apiRoot + '/tips';

module.exports = {
  all: function() {
    return core.get(baseEndpoint);
  },

  one: function(id) {
    return core.get(baseEndpoint + '/' + id);
  },

  create: function(tip) {
    return core.post(baseEndpoint, tip);
  },

  update: function(id, tip) {
    return core.put(baseEndpoint + '/' + id, tip);
  },

  destroy: function(id) {
    return core.delete(baseEndpoint + '/' + id);
  }
}
