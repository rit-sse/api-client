'use strict';

require('es6-promise').polyfill();

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
  this.core.token = null;
  if (typeof sessionStorage !== 'undefined') {
    var token = sessionStorage.getItem('jwt');
    if (token) {
      this.core.get('auth/' + provider).then(function checkUser(user) {
        if (user) {
          self.core.token = token;
          return Promise.resolve(user);
        }
        return Promise.reject('Token Not Valid');
      }).catch(function reject() {
        return Promise.reject('Server Error');
      });
    }
    return Promise.reject('No token');
  }
};

Auth.prototype.clientId = function clientId() {
  return this.core.get('auth/googleClientID/').then(function getID(id) {
    return Promise.resolve(id);
  }).catch(function reject() {
    return Promise.reject({});
  });
};

Auth.prototype.signOut = function signOut() {
  this.core.token = null;
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem('jwt');
  }
};

module.exports = Auth;
