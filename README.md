# api-client
Client to the API


To create an API instance:

```javascript
var API = require('sse-api-client');

var MyInstance = new API('http://URI/to/api/root');
var Member = MyInstance.Member;

Member.all({term: 1}, function(err, res){
    // do something
});
```