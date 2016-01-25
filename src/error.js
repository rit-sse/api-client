'use strict';

function ResponseError(text, body){
  this.name = "ResponseError";
  this.message = text;
  this.body = body;
  this.stack = (new Error()).stack;
}

ResponseError.gen_error = function gen_error(resp){
  return resp.body().then(function(body){
    return new ResponseError(resp.statusText, body);
  });
}

ResponseError.prototype = new Error;

module.exports = ResponseError;
