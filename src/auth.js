'use strict';

function Auth(core) {
  this.core = core;
}

Auth.prototype.getToken = function getToken(provider, id, secret) {
  var core = this.core;
  return this.core
    .post('auth/' + provider, { id: id, secret: secret })
    .then(function setToken(body) {
      core.token = body.token;
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('jwt', core.token);
      }
    });
};

Auth.prototype.checkToken = function checkToken(provider) {
  var self = this; // I hate myself because I am what is wrong with the world
  if (typeof sessionStorage !== 'undefined') {
    var token = sessionStorage.getItem('jwt');
    if (token) {
      this.core.get('auth/' + provider).then(function checkUser(user) {
        if (user) {
          self.core.token = token;
          return user;
        }
        self.core.token = null;
        return null;
      }).catch(function reject() {
        self.core.token = null;
        return null;
      });
    }
  }
};

Auth.prototype.signOut = function signOut() {
  this.core.token = null;
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem('jwt');
  }
};

module.exports = Auth;
