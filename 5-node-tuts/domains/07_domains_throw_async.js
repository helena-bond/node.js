var EventEmitter = require('events').EventEmitter;
var domain = require('domain');

var a;

var server = require('http').createServer();
server.on('request', function(req, res) {

  var d = domain.create();

  d.on('error', function(err) {
    res.writeHead(500);
    res.end(err.message);
  });

  d.run(function() {
    setTimeout(function() {
      a.abc();
    }, 500);
  });

});
server.listen(process.env.PORT, process.env.IP);