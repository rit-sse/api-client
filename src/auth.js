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
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('jwt', core.token);
      }
    });
};

module.exports = Auth;
