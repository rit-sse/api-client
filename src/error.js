'use strict';

function ResponseError(resp){
  this.name = "ResponseError";
  this.message = resp.statusText;
  this.body = resp.text();
  this.stack = (new Error()).stack;
}

ResponseError.prototype = new Error;

module.exports = ResponseError;
