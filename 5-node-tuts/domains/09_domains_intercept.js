var EventEmitter = require('events').EventEmitter;
var domain = require('domain');
var fs = require('fs');

var a;

var server = require('http').createServer();
server.on('request', function(req, res) {

  var d = domain.create();

  d.add(req);
  d.add(res);

  var replied = false;

  d.on('error', function(err) {
    if (! replied) {
      replied = true;
      res.writeHead(500);
      res.end(err.message);      
    }
  });

  d.run(function() {
    fs.readFile(__filename, d.intercept(function(contents) {
      res.end(contents);
    }));
  });

});
server.listen(process.env.PORT, process.env.IP);