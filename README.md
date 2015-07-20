# api-client
Client to the API


To create an API instance:

```javascript
var API = require('sse-api-client');

var MyInstance = new API('http://URI/to/api/root');

MyInstance.Member.all().then(function(members){
    //..do something with them
});
```