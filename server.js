var API = require('./src');

var MyInstance = new API('http://localhost:3000/api/v1/');
var Links = MyInstance.Links;
var Auth = MyInstance.Auth;

// WORKS
Auth
  .getToken('slack', 'knm5153', '61fc14cfc072784da46649d4491614a02be4ffd25b6b0329a4f83a875394ff41095e3613696753dbc51df3570874cb7c')
  .then(function(res) {
    return Links.all();
  })
  .then(console.log)
  .catch(console.log)
// DOESN'T WORK
// Auth.getToken('slack', 'knm5153', 'SUPER SECRET', function(err, res){
//   Quotes.create({ body: 'another thing', tags: [ "a", "thing"], description: "something"}, function(err, res){
//     console.log(res.body);
//       Quotes.create({ body: 'another thing', tags: [ "a", "thing"], description: "something"}, function(err, res){
//         console.log(res.body);
//       });
//   });
// });
