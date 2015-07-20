var api = require('./api');
var Core = require('./core');

module.exports = function(apiRoot) {

  var core = new Core(apiRoot);
  var API = api.bind(null, core);

  this.Committee = new API('committees');
  this.Event = new API('events');
  this.Lingo = new API('lingo');
  this.Member = new API('members');
  this.Membership = new API('memberships');
  this.Mentor = new API('mentors'); // TODO: Current Mentor
  this.Officer = new API('officers');
  this.Term = new API('terms');
  this.Tips = new API('tips');
}