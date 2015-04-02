
var express = require('express');
var reloader = require('connect-livereload');
var app = express();

app.use(reloader());
app.use(express.static('./'));

app.listen(9000);
