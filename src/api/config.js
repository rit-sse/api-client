var config =  {
  apiRoot: "http://localhost:8000/api/v1",
  baseEndpoint: function(resource) {
    return config.apiRoot + '/' + resource;
  }
}

module.exports = config;