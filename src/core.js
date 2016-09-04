import url from 'url';
import 'isomorphic-fetch';

function reject(val) {
  throw new Error(val);
}

function status(response) {
  if (response.status >= 200 && response.status < 300) return response; 
  return response.json().then(
    function handleResponse(data, err) {
      if (err) {
        return response.text().then(reject);
      }
      reject(data.error);
    });
}

function json(response) {
  if (response.status === 204) return {}
  return response.json();
}

class Core {
  constructor(apiRoot) {
    this.apiRoot = apiRoot;
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('jwt');
    }
  }

  request = (resource, method, body) => {
    return fetch(url.resolve(this.apiRoot, resource), {
      method: method,
      headers: {
        Authorization: 'Bearer ' + this.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(status)
      .then(json);
  }

  get = (resource) => {
    return this.request(resource, 'get');
  }

  post = (resource, body) => {
    return this.request(resource, 'post', body);
  }

  put = (resource, body) => {
    return this.request(resource, 'put', body);
  }

  delete = (resource) => {
    return this.request(resource, 'delete');
  }
}

export default Core;
