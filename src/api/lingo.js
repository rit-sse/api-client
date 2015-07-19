var core = require('./core');
var config = require('./config');

function baseEndpoint() {
  return config.baseEndpoint('lingo')
}

module.exports = {

  all: function() {
    return core.get(baseEndpoint());
  },

  one: function(id) {
    return core.get(baseEndpoint() + '/' + id);
  },

  create: function(lingo) {
    return core.post(baseEndpoint(), lingo)
  },

  update: function(id, lingo) {
    return core.post(baseEndpoint() + '/' + id, lingo);
  },

  destroy: function(id) {
    core.delete(baseEndpoint() + '/' + id);
  }
}