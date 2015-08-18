# api-client
Client to the API


To create an API instance:

```javascript
var API = require('sse-api-client');

var MyInstance = new API('http://URI/to/api/root/');
var Members = MyInstance.Members;

Members
  .all()
  .then(function(res) {
    // do something
  })
  .catch(function(err) {
    // do something
  })
```
