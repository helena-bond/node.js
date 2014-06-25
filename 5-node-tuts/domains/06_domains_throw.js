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
    a.abc();
    var ee = new EventEmitter();

    ee.emit('example', 1, 2, 3);
    ee.emit('error', new Error('something terrible has happened'));
    res.end('Thank you for using our service!');    
  });

});
server.listen(process.env.PORT, process.env.IP);