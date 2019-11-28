# api-client
[![Circle CI](https://circleci.com/gh/rit-sse/api-client.svg?style=svg)](https://circleci.com/gh/rit-sse/api-client)

Client to the API

To create an API instance:

```javascript
const API = require('sse-api-client');

const MyInstance = new API('http://URI/to/api/root/');
const Members = MyInstance.Members;

Members
  .all()
  .then(function(res) {
    // do something
  })
  .catch(function(err) {
    // do something
  })
```
