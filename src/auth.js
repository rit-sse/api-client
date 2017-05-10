class Auth {
  constructor(core) {
    this.core = core;
  }

  getToken(provider, id, secret) {
    return this.core
      .post(`auth/${provider}`, { id, secret })
      .then((body) => {
        this.core.token = body.token;
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('jwt', this.core.token);
        }
      });
  }

  checkToken() {
    this.core.token = null;
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('jwt');
      if (token) {
        this.core.token = token;
        return this.core.get('auth/').then((user) => {
          if (user) {
            this.core.token = token;
            return user;
          }
          this.core.token = null;
          return Promise.reject('Token Not Valid');
        });
      }
      this.core.token = null;
      return Promise.reject('No token');
    }
    return Promise.reject('No Session Storage');
  }

  clientId() {
    return this.core.get('auth/googleClientID/');
  }

  signOut() {
    this.core.token = null;
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('jwt');
    }
  }
}

export default Auth;
