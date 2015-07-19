var core = require('./core');
var config = require('./config');

function baseEndpoint() {
  return config.baseEndpoint('officers')
}

module.exports = {

  all: function() {
    return core.get(baseEndpoint());
  },

  one: function(id) {
    return core.get(baseEndpoint() + '/' + id);
  },

  create: function(officer) {
    return core.post(baseEndpoint(), officer)
  },

  destroy: function(id) {
    core.delete(baseEndpoint() + '/' + id);
  }
}