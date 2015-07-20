var Api= require('./src');

var C = new Api('http://vm01.craigcabrey.com:8000/api/v1/');

C.Member.all().then(console.log);