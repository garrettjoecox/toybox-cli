(function(){
  var express = require('express');
  var reloader = require('connect-livereload')
  var app = express();
  app.use(reloader());
  app.use(express.static('./client'));
  app.listen(9000, function(){
    console.log("Listening on http://localhost:9000/");
    console.log("Close server with Ctrl + C");
  });
})();