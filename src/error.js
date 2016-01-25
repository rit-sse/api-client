'use strict';

require('es6-promise').polyfill();

function ResponseError(text, body){
  this.name = "ResponseError";
  this.message = text;
  this.body = body;
  this.stack = (new Error()).stack;
}

ResponseError.gen_error = function gen_error(resp){
  return resp.text().then(function(body){
    return Promise.reject(new ResponseError(resp.statusText, body));
  });
}

ResponseError.prototype = new Error;

module.exports = ResponseError;
