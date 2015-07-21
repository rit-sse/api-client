var api = require('./api');
var Core = require('./core');

module.exports = function(apiRoot) {

  var core = new Core(apiRoot);
  var API = api.bind(null, core);

  this.Committees = new API('committees');
  this.Events = new API('events');
  this.Lingo = new API('lingo');
  this.Members = new API('members');
  this.Memberships = new API('memberships');
  this.Mentors = new API('mentors'); // TODO: Current Mentor
  this.Officers = new API('officers');
  this.Terms = new API('terms');
  this.Tips = new API('tips');
}